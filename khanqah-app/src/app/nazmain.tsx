import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';

const DATA = [
  { id: '1', title: 'منقبت حضرت غوث الاعظمؒ', desc: 'روح پرور کلام', audio: true },
  { id: '2', title: 'مناجاتِ مقبول', desc: 'قلب کی بیداری کےلئے', audio: false },
];

export default function NazmainScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: '#8B5CF6' }]}>
        <Text style={{ fontSize: 24 }}>📜</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>← واپس</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>روحانی نظمیں</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 20 },
  backBtn: { color: Colors.light.gold, fontWeight: '600' },
  headerTitle: { fontFamily: Fonts.urdu, fontSize: 20, color: Colors.light.emeraldDeep, fontWeight: '700' },
  list: { padding: 20 },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5
  },
  iconBox: { width: 56, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1 },
  title: { fontFamily: Fonts.urdu, fontSize: 16, color: Colors.light.text, fontWeight: '700', marginBottom: 4 },
  info: { fontSize: 12, color: Colors.light.textMuted }
});