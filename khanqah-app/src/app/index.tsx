import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>خانقاہ جاویدیہ</Text>
        <Text style={styles.brandSubtitle}>روحانیت، علم اور تزکیہ قلب</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Lineage Card */}
        <View style={styles.lineageCard}>
          <Text style={styles.lineageTitle}>سلسلہ عالیہ قادریہ راشدیہ</Text>
          <Text style={styles.lineageText}>
            مفتی محمد ذبیح اللہ مہران حفظہ اللہ تعالیٰ
          </Text>
        </View>

        {/* Modules Grid */}
        <View style={styles.grid}>
          <ModuleCard title="بیانات" desc="آڈیو و ویڈیو دروس" icon="🎙️" onPress={() => router.push('/bayan')} />
          <ModuleCard title="نظمیں" desc="روحانی مناجات" icon="📜" onPress={() => router.push('/nazmain')} />
          <ModuleCard title="تفسیر" desc="مستند تفاسیر" icon="📖" onPress={() => router.push('/tafseer')} />
          <ModuleCard title="فقہ" desc="شرعی احکام" icon="⚖️" onPress={() => router.push('/fiqh')} />
          <ModuleCard title="معمولات" desc="روزانہ ذکر و اذکار" icon="📿" fullWidth onPress={() => router.push('/maamulat')} />
        </View>

        {/* Temporary Admin Access for Testing */}
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push('/admin-dashboard-mock')}
        >
          <Text style={styles.adminButtonText}>⚙️ Open Admin Dashboard (Testing)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ModuleCard({ title, desc, icon, onPress, fullWidth = false }) {
  return (
    <TouchableOpacity
      style={[styles.card, fullWidth && styles.fullWidth]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: {
    backgroundColor: Colors.light.emeraldDeep,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: Fonts.urdu,
    fontSize: 24,
    color: '#FFF',
    fontWeight: '700'
  },
  brandSubtitle: {
    fontSize: 12,
    color: Colors.light.gold,
    marginTop: 2
  },
  scrollContent: { padding: 20 },
  lineageCard: {
    backgroundColor: Colors.light.card,
    padding: 20,
    borderRadius: 20,
    borderRightWidth: 5,
    borderRightColor: Colors.light.gold,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  lineageTitle: { fontFamily: Fonts.urdu, fontSize: 16, color: Colors.light.emeraldDeep, fontWeight: '700', marginBottom: 8 },
  lineageText: { fontFamily: Fonts.urdu, fontSize: 14, color: Colors.light.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  card: {
    width: '46%',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.card,
    alignItems: 'center'
  },
  fullWidth: { width: '100%', flexDirection: 'row', gap: 16, alignItems: 'center' },
  iconBox: { width: 48, height: 48, backgroundColor: Colors.light.emeraldVibrant, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  icon: { fontSize: 22 },
  cardTitle: { fontFamily: Fonts.urdu, fontSize: 16, fontWeight: '700', color: Colors.light.text },
  cardDesc: { fontSize: 11, color: Colors.light.textMuted },
  adminButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },
  adminButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151'
  }
});