import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default function BayanScreen() {
  const router = useRouter();
  const [bayans, setBayans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBayans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bayans'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBayans(data);
      } catch (error) {
        console.error("Error fetching bayans: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBayans();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert(`Playing: ${item.title}`)}>
      <View style={styles.iconBox}>
        <Text style={{ fontSize: 24 }}>▶</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>{item.speaker || 'مفتی محمد ذبیح اللہ مہران'} • {item.date || 'نیا'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.light.emeraldVibrant} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>← واپس</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>بیاناتِ کبار</Text>
      </View>
      <FlatList
        data={bayans}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>کوئی بیان موجود نہیں ہے۔</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 20 },
  backBtn: { color: Colors.light.gold, fontWeight: '600' },
  headerTitle: { fontFamily: Fonts.urdu, fontSize: 20, color: Colors.light.emeraldDeep, fontWeight: '700' },
  list: { padding: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, color: Colors.light.textMuted },
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
  iconBox: { width: 56, height: 56, backgroundColor: Colors.light.emeraldVibrant, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  details: { flex: 1 },
  title: { fontFamily: Fonts.urdu, fontSize: 16, color: Colors.light.text, fontWeight: '700', marginBottom: 4 },
  info: { fontSize: 12, color: Colors.light.textMuted }
});
