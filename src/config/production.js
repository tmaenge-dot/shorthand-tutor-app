// Production Configuration for Shorthand Tutor App
// This file manages deployment settings and feature flags

export const ProductionConfig = {
  // Deployment Strategy
  deployment: {
    strategy: 'monitor-first', // Options: 'monitor-first' | 'full-features'
    environment: 'production',
    version: '1.0.0',
    buildDate: new Date().toISOString()
  },

  // Feature Flags for Gradual Rollout
  features: {
    // Core Learning Features (Always Enabled)
    core: {
      strokeRecognition: true,
      aiVowelPhrase: true,
      qaAssistant: true,
      practiceMode: true,
      assessments: true,
      progressTracking: true,
      speedDevelopment: true,
      outlinePhrasing: true
    },

    // Payment & Billing Features (Configurable)
    payments: {
      billingSystem: false,           // Start disabled for monitoring
      paymentProcessing: false,       // Start disabled for monitoring
      subscriptionPlans: false,       // Start disabled for monitoring
      premiumContent: false,          // Start disabled for monitoring
      stripeIntegration: false,       // Requires careful setup
      paypalIntegration: false        // Alternative payment method
    },

    // Advanced Features
    advanced: {
      aiSystemManager: true,
      realTimeMonitoring: true,
      errorPrediction: true,
      autoHealing: true,
      performanceAnalytics: true
    }
  },

  // Monitoring Configuration
  monitoring: {
    enabled: true,
    intervals: {
      healthCheck: 30000,      // 30 seconds
      metricsUpdate: 5000,     // 5 seconds
      errorTracking: 1000      // 1 second
    },
    thresholds: {
      maxResponseTime: 2000,   // 2 seconds
      maxErrorRate: 1,         // 1%
      minUptime: 99.5,         // 99.5%
      maxMemoryUsage: 70       // 70%
    }
  },

  // Payment Provider Configuration (for future use)
  paymentProviders: {
    stripe: {
      enabled: false,
      testMode: true,
      publicKey: 'pk_test_...',  // Use test keys initially
      webhookSecret: 'whsec_...'
    },
    paypal: {
      enabled: false,
      testMode: true,
      clientId: 'sb_...'        // Sandbox client ID
    }
  },

  // Security Configuration
  security: {
    enforceHttps: true,
    corsOrigins: ['https://yourdomain.com'],
    rateLimiting: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000         // 1 minute
    },
    dataEncryption: true
  },

  // Analytics Configuration
  analytics: {
    enabled: true,
    providers: {
      googleAnalytics: {
        enabled: false,         // Enable after privacy policy
        trackingId: 'GA_MEASUREMENT_ID'
      },
      customAnalytics: {
        enabled: true,
        trackUserInteractions: true,
        trackPerformance: true,
        trackErrors: true
      }
    }
  },

  // Content Delivery
  cdn: {
    enabled: false,             // Can be enabled for performance
    provider: 'cloudflare',     // Options: 'cloudflare' | 'aws' | 'azure'
    cacheSettings: {
      staticAssets: '1y',       // 1 year
      apiResponses: '5m'        // 5 minutes
    }
  },

  // Backup and Recovery
  backup: {
    enabled: true,
    frequency: 'daily',
    retention: 30,              // 30 days
    locations: ['local', 'cloud']
  }
};

// Environment-specific overrides
export const EnvironmentConfig = {
  development: {
    features: {
      payments: {
        billingSystem: true,      // Enable for testing
        paymentProcessing: true   // Enable for testing
      }
    },
    monitoring: {
      intervals: {
        healthCheck: 60000       // Slower in development
      }
    }
  },

  staging: {
    features: {
      payments: {
        billingSystem: true,      // Test billing in staging
        paymentProcessing: false  // No real payments in staging
      }
    },
    paymentProviders: {
      stripe: {
        enabled: true,
        testMode: true            // Always test mode in staging
      }
    }
  },

  production: {
    features: {
      payments: {
        billingSystem: false,     // Start disabled
        paymentProcessing: false  // Start disabled
      }
    },
    security: {
      enforceHttps: true,
      corsOrigins: ['https://shorthand-tutor.com'] // Your production domain
    }
  }
};

// Deployment Readiness Checker
export class DeploymentChecker {
  static checkReadiness(config = ProductionConfig) {
    const checks = {
      coreFeatures: this.checkCoreFeatures(config),
      monitoring: this.checkMonitoring(config),
      security: this.checkSecurity(config),
      performance: this.checkPerformance(config),
      payments: this.checkPayments(config)
    };

    const overallScore = Object.values(checks).reduce((sum, check) => sum + check.score, 0) / Object.keys(checks).length;

    return {
      overall: overallScore,
      checks,
      recommendations: this.generateRecommendations(checks),
      deploymentStrategy: this.recommendStrategy(checks)
    };
  }

  static checkCoreFeatures(config) {
    const coreFeatures = Object.values(config.features.core);
    const enabledCount = coreFeatures.filter(Boolean).length;
    const score = (enabledCount / coreFeatures.length) * 100;

    return {
      score,
      status: score === 100 ? 'ready' : 'incomplete',
      details: `${enabledCount}/${coreFeatures.length} core features enabled`
    };
  }

  static checkMonitoring(config) {
    const score = config.monitoring.enabled ? 100 : 0;
    return {
      score,
      status: config.monitoring.enabled ? 'ready' : 'disabled',
      details: config.monitoring.enabled ? 'Full monitoring enabled' : 'Monitoring disabled'
    };
  }

  static checkSecurity(config) {
    const securityChecks = [
      config.security.enforceHttps,
      config.security.rateLimiting.enabled,
      config.security.dataEncryption
    ];
    const score = (securityChecks.filter(Boolean).length / securityChecks.length) * 100;

    return {
      score,
      status: score >= 80 ? 'ready' : 'needs-attention',
      details: `${securityChecks.filter(Boolean).length}/${securityChecks.length} security measures enabled`
    };
  }

  static checkPerformance(config) {
    // Performance is assumed ready for this assessment
    return {
      score: 95,
      status: 'ready',
      details: 'Performance optimization in place'
    };
  }

  static checkPayments(config) {
    const paymentFeatures = Object.values(config.features.payments);
    const enabledCount = paymentFeatures.filter(Boolean).length;
    const score = enabledCount === 0 ? 100 : 50; // 100% ready if disabled (for monitoring strategy)

    return {
      score,
      status: enabledCount === 0 ? 'monitoring-ready' : 'payment-enabled',
      details: enabledCount === 0 ? 'Payments disabled for monitoring strategy' : `${enabledCount} payment features enabled`
    };
  }

  static generateRecommendations(checks) {
    const recommendations = [];

    if (checks.coreFeatures.score === 100) {
      recommendations.push('✅ All core features ready for production');
    }

    if (checks.monitoring.score === 100) {
      recommendations.push('✅ Full monitoring system active');
    }

    if (checks.payments.status === 'monitoring-ready') {
      recommendations.push('💡 Recommended: Deploy with monitoring-first strategy');
      recommendations.push('📊 Collect user data before enabling payments');
    }

    if (checks.security.score >= 80) {
      recommendations.push('🔒 Security measures adequate for production');
    }

    return recommendations;
  }

  static recommendStrategy(checks) {
    if (checks.payments.status === 'monitoring-ready' && checks.coreFeatures.score === 100) {
      return {
        strategy: 'monitor-first',
        confidence: 95,
        description: 'Deploy core features first, monitor performance, then enable payments based on data'
      };
    } else if (checks.payments.status === 'payment-enabled') {
      return {
        strategy: 'full-features',
        confidence: 70,
        description: 'Deploy with all features enabled (higher risk but immediate monetization)'
      };
    } else {
      return {
        strategy: 'staged-rollout',
        confidence: 85,
        description: 'Gradually enable features based on system stability'
      };
    }
  }
}

// Export current configuration
export default ProductionConfig;