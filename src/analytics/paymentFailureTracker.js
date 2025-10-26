// Payment Failure Tracking System
// Comprehensive monitoring for failed subscription attempts

export class PaymentFailureTracker {
  constructor() {
    this.failureBuffer = [];
    this.retryQueue = [];
    this.analyticsEndpoint = '/api/payment-failures';
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 seconds
    
    this.initializeTracking();
  }

  initializeTracking() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flushFailureBuffer();
      }
    });

    // Track browser close/refresh
    window.addEventListener('beforeunload', () => {
      this.flushFailureBuffer();
    });

    // Monitor network status
    window.addEventListener('online', () => {
      this.processRetryQueue();
    });

    // Set up periodic failure reporting
    setInterval(() => {
      this.flushFailureBuffer();
    }, 30000); // Every 30 seconds
  }

  // Track payment attempt initiation
  trackPaymentAttempt(userInfo, subscriptionDetails) {
    const attemptData = {
      attemptId: this.generateAttemptId(),
      timestamp: new Date().toISOString(),
      userId: userInfo.userId || 'anonymous',
      userEmail: userInfo.email || 'unknown',
      userName: userInfo.name || 'unknown',
      subscriptionPlan: subscriptionDetails.plan,
      subscriptionPrice: subscriptionDetails.price,
      subscriptionDuration: subscriptionDetails.duration,
      paymentMethod: subscriptionDetails.paymentMethod,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      browserLanguage: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      sessionDuration: this.getSessionDuration(),
      previousPagePath: document.referrer,
      currentPagePath: window.location.pathname,
      networkConnection: this.getNetworkInfo(),
      deviceInfo: this.getDeviceInfo(),
      status: 'initiated'
    };

    // Store attempt data
    localStorage.setItem(`payment_attempt_${attemptData.attemptId}`, JSON.stringify(attemptData));
    
    return attemptData.attemptId;
  }

  // Track payment failure with detailed error information
  trackPaymentFailure(attemptId, failureDetails) {
    const attemptData = this.getAttemptData(attemptId);
    if (!attemptData) {
      console.error('Payment attempt data not found for ID:', attemptId);
      return;
    }

    const failureData = {
      ...attemptData,
      status: 'failed',
      failureTimestamp: new Date().toISOString(),
      failureType: failureDetails.type || 'unknown',
      errorCode: failureDetails.errorCode || 'UNKNOWN_ERROR',
      errorMessage: failureDetails.errorMessage || 'Unknown error occurred',
      stackTrace: failureDetails.stackTrace || '',
      
      // Payment-specific failure details
      paymentGatewayResponse: failureDetails.gatewayResponse || {},
      cardDetails: {
        lastFourDigits: failureDetails.cardLastFour || '',
        cardType: failureDetails.cardType || '',
        expiryMonth: failureDetails.expiryMonth || '',
        expiryYear: failureDetails.expiryYear || ''
      },
      
      // App state during failure
      appVersion: this.getAppVersion(),
      browserErrors: this.getBrowserErrors(),
      networkLatency: failureDetails.networkLatency || 0,
      memoryUsage: this.getMemoryUsage(),
      
      // User interaction context
      timeToFailure: new Date() - new Date(attemptData.timestamp),
      userInteractions: this.getUserInteractions(attemptId),
      formValidationErrors: failureDetails.validationErrors || [],
      
      // Recovery potential
      isRetryable: failureDetails.isRetryable !== false,
      suggestedAction: this.getSuggestedAction(failureDetails),
      customerSupportPriority: this.getCustomerSupportPriority(failureDetails),
      
      // Business impact
      revenueImpact: attemptData.subscriptionPrice,
      customerLifetimeValue: failureDetails.customerLTV || 0,
      isExistingCustomer: failureDetails.isExistingCustomer || false
    };

    // Add to failure buffer for batch reporting
    this.failureBuffer.push(failureData);
    
    // Store locally for recovery
    localStorage.setItem(`payment_failure_${attemptId}`, JSON.stringify(failureData));
    
    // Immediate notification for high-priority failures
    if (failureData.customerSupportPriority === 'high') {
      this.sendImmediateAlert(failureData);
    }

    // Trigger recovery flow
    this.initiateRecoveryFlow(failureData);

    return failureData;
  }

  // Track successful payment (for comparison analysis)
  trackPaymentSuccess(attemptId, successDetails) {
    const attemptData = this.getAttemptData(attemptId);
    if (!attemptData) return;

    const successData = {
      ...attemptData,
      status: 'success',
      successTimestamp: new Date().toISOString(),
      transactionId: successDetails.transactionId,
      paymentGatewayResponse: successDetails.gatewayResponse || {},
      timeToSuccess: new Date() - new Date(attemptData.timestamp),
      actualAmountCharged: successDetails.amountCharged,
      gatewayFees: successDetails.gatewayFees || 0
    };

    // Clean up attempt data
    localStorage.removeItem(`payment_attempt_${attemptId}`);
    
    // Store success for analytics
    this.reportPaymentSuccess(successData);
  }

  // Generate comprehensive failure report
  generateFailureReport() {
    const failures = this.getStoredFailures();
    const report = {
      reportGenerated: new Date().toISOString(),
      totalFailures: failures.length,
      totalRevenueImpact: failures.reduce((sum, f) => sum + f.revenueImpact, 0),
      failuresByType: this.groupFailuresByType(failures),
      failuresByErrorCode: this.groupFailuresByErrorCode(failures),
      failuresByPaymentMethod: this.groupFailuresByPaymentMethod(failures),
      failuresByTimeOfDay: this.groupFailuresByTimeOfDay(failures),
      failuresByDevice: this.groupFailuresByDevice(failures),
      failuresByBrowser: this.groupFailuresByBrowser(failures),
      averageTimeToFailure: this.calculateAverageTimeToFailure(failures),
      retrySuccessRate: this.calculateRetrySuccessRate(failures),
      topErrorMessages: this.getTopErrorMessages(failures),
      affectedCustomers: this.getAffectedCustomers(failures),
      urgentRecoveryOpportunities: this.getUrgentRecoveryOpportunities(failures),
      systemHealthMetrics: this.getSystemHealthMetrics(),
      recommendedActions: this.getRecommendedActions(failures)
    };

    return report;
  }

  // Recovery flow for failed payments
  initiateRecoveryFlow(failureData) {
    if (!failureData.isRetryable) return;

    // Add to retry queue
    this.retryQueue.push({
      attemptId: failureData.attemptId,
      failureData: failureData,
      retryCount: 0,
      nextRetryTime: Date.now() + this.retryDelay
    });

    // Schedule automatic retry for network/temporary issues
    if (this.isTemporaryFailure(failureData)) {
      setTimeout(() => {
        this.attemptAutomaticRetry(failureData.attemptId);
      }, this.retryDelay);
    }

    // Notify customer support for manual intervention
    if (failureData.customerSupportPriority === 'high') {
      this.notifyCustomerSupport(failureData);
    }

    // Send recovery email to customer
    this.scheduleRecoveryEmail(failureData);
  }

  // Helper methods
  generateAttemptId() {
    return 'pay_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getAttemptData(attemptId) {
    const data = localStorage.getItem(`payment_attempt_${attemptId}`);
    return data ? JSON.parse(data) : null;
  }

  getStoredFailures() {
    const failures = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('payment_failure_')) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            failures.push(JSON.parse(data));
          } catch (e) {
            console.error('Error parsing failure data:', e);
          }
        }
      }
    }
    return failures;
  }

  getSuggestedAction(failureDetails) {
    const errorCode = failureDetails.errorCode;
    
    if (errorCode.includes('NETWORK')) {
      return 'retry_with_better_connection';
    } else if (errorCode.includes('CARD_DECLINED')) {
      return 'try_different_payment_method';
    } else if (errorCode.includes('VALIDATION')) {
      return 'fix_form_errors';
    } else if (errorCode.includes('TIMEOUT')) {
      return 'retry_immediately';
    } else if (errorCode.includes('SERVER_ERROR')) {
      return 'contact_support';
    }
    
    return 'contact_support';
  }

  getCustomerSupportPriority(failureDetails) {
    // High priority: Existing customers, high-value subscriptions, multiple failures
    if (failureDetails.isExistingCustomer || 
        failureDetails.customerLTV > 1000 ||
        failureDetails.subscriptionPrice > 100) {
      return 'high';
    }
    
    // Medium priority: Retryable errors, moderate value
    if (failureDetails.isRetryable && failureDetails.subscriptionPrice > 20) {
      return 'medium';
    }
    
    return 'low';
  }

  isTemporaryFailure(failureData) {
    const temporaryErrors = ['NETWORK_ERROR', 'TIMEOUT', 'TEMPORARY_UNAVAILABLE', 'RATE_LIMITED'];
    return temporaryErrors.some(error => failureData.errorCode.includes(error));
  }

  getSessionDuration() {
    const sessionStart = localStorage.getItem('session_start');
    return sessionStart ? Date.now() - parseInt(sessionStart) : 0;
  }

  getNetworkInfo() {
    if ('connection' in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      };
    }
    return {};
  }

  getDeviceInfo() {
    return {
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency
    };
  }

  getAppVersion() {
    return process.env.REACT_APP_VERSION || '1.0.0';
  }

  getBrowserErrors() {
    // Return any JavaScript errors that occurred during the session
    return window.collectedErrors || [];
  }

  getMemoryUsage() {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return {};
  }

  // Batch reporting to backend
  async flushFailureBuffer() {
    if (this.failureBuffer.length === 0) return;

    const failures = [...this.failureBuffer];
    this.failureBuffer = [];

    try {
      await fetch(this.analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'payment_failures',
          failures: failures,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      // If sending fails, put failures back in buffer
      this.failureBuffer.unshift(...failures);
      console.error('Failed to send failure data:', error);
    }
  }

  // Send immediate alerts for critical failures
  async sendImmediateAlert(failureData) {
    try {
      await fetch('/api/alerts/payment-failure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'immediate_alert',
          priority: 'high',
          failureData: failureData,
          alertTimestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to send immediate alert:', error);
    }
  }

  // Export failure data for external analysis
  exportFailureData(format = 'json') {
    const failures = this.getStoredFailures();
    const report = this.generateFailureReport();
    
    if (format === 'csv') {
      return this.convertToCSV(failures);
    }
    
    return {
      failures: failures,
      report: report
    };
  }

  // Clean up old failure data
  cleanupOldFailures(daysToKeep = 30) {
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key.startsWith('payment_failure_')) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const failureData = JSON.parse(data);
            if (new Date(failureData.failureTimestamp).getTime() < cutoffTime) {
              localStorage.removeItem(key);
            }
          } catch (e) {
            // Remove corrupted data
            localStorage.removeItem(key);
          }
        }
      }
    }
  }
}

// Global instance
export const paymentFailureTracker = new PaymentFailureTracker();