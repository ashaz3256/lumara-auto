import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { type Advice, type SessionData } from './schemas'

// Register font for better rendering
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #3b82f6',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280'
  },
  severityBadge: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    padding: '8 16',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  severityBadgeLimit: {
    backgroundColor: '#f59e0b'
  },
  severityBadgeOk: {
    backgroundColor: '#10b981'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 5
  },
  driveability: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4
  },
  causeItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4
  },
  causeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4
  },
  causeWhy: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4
  },
  causeConfidence: {
    fontSize: 11,
    color: '#9ca3af'
  },
  checkItem: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 6,
    paddingLeft: 10
  },
  notes: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fef3c7',
    borderRadius: 4
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10
  }
})

export function generateAdvicePDF(sessionData: SessionData, advice: Advice): React.ReactElement {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'STOP': return styles.severityBadge
      case 'LIMIT': return [styles.severityBadge, styles.severityBadgeLimit]
      case 'OK': return [styles.severityBadge, styles.severityBadgeOk]
      default: return styles.severityBadge
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Lumara Auto - Vehicle Triage Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date(sessionData.createdAt).toLocaleDateString()} at {new Date(sessionData.createdAt).toLocaleTimeString()}
          </Text>
        </View>

        <View style={getSeverityStyle(advice.severity)}>
          <Text>SEVERITY: {advice.severity}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Can I Drive?</Text>
          <Text style={styles.driveability}>{advice.driveability}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Likely Causes (Ranked by Probability)</Text>
          {advice.causes.map((cause, index) => (
            <View key={index} style={styles.causeItem}>
              <Text style={styles.causeTitle}>
                {index + 1}. {cause.cause}
              </Text>
              <Text style={styles.causeWhy}>Why: {cause.why}</Text>
              <Text style={styles.causeConfidence}>
                Confidence: {Math.round(cause.confidence * 100)}%
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safe Checks You Can Do</Text>
          {advice.checks.map((check, index) => (
            <Text key={index} style={styles.checkItem}>
              • {check}
            </Text>
          ))}
        </View>

        {advice.notes && (
          <View style={styles.section}>
            <Text style={styles.notes}>
              Additional Notes: {advice.notes}
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>
            This report is for informational purposes only. Always consult a qualified mechanic for professional diagnosis and repair.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
