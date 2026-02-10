import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Sarabun',
  src: 'https://fonts.gstatic.com/s/sarabun/v13/DtVjJx26TKEr37c9aBBx.woff2',
});

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Sarabun', fontSize: 11 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 12 },
  label: { fontSize: 9, color: '#666', marginBottom: 2 },
  value: { marginBottom: 6 },
});

export default function ApplicationPDF({ data }: { data: Record<string, unknown> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>ใบสมัคร Miss Wellness World Thailand</Text>
        <View style={styles.section}>
          <Text style={styles.label}>ชื่อ-นามสกุล (ไทย)</Text>
          <Text style={styles.value}>{String(data.name_th ?? '')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>ชื่อเล่น / โทรศัพท์</Text>
          <Text style={styles.value}>{String(data.nickname ?? '')} / {String(data.phone ?? '')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>อีเมล</Text>
          <Text style={styles.value}>{String(data.email ?? '-')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>ที่อยู่</Text>
          <Text style={styles.value}>
            {[data.address_no, data.address_village, data.address_soi, data.address_road, data.address_tambol, data.address_amphoe, data.address_province]
              .filter(Boolean)
              .join(' ')}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>วันที่สมัคร</Text>
          <Text style={styles.value}>{String(data.application_date ?? '')}</Text>
        </View>
      </Page>
    </Document>
  );
}
