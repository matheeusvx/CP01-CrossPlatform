import { ScrollView, View, Text, StyleSheet } from 'react-native'; 
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Header
        title="Challenge Hub FIAP"
        subtitle="Um app simples para centralizar avisos, comunicação, comunidade e calendário do Challenge."
      />

      <View style={styles.cardsContainer}>
        <MenuCard
          icon="📢"
          title="Portal de Avisos"
          description="Veja avisos e atualizações importantes do Challenge."
          route="/avisos"
        />

        <MenuCard
          icon="🏢"
          title="Empresa"
          description="Envie dúvidas de forma simples para a empresa parceira."
          route="/empresa"
        />

        <MenuCard
          icon="💬"
          title="Comunidade"
          description="Acompanhe posts e interações entre os grupos."
          route="/comunidade"
        />

        <MenuCard
          icon="📅"
          title="Calendário"
          description="Consulte sprints, eventos e datas importantes."
          route="/calendario"
        />
      </View>

      <View style={styles.footerBox}>
        <Text style={styles.footerTitle}>Problema resolvido</Text>
        <Text style={styles.footerText}>
          O app organiza a comunicação do Challenge em um único lugar, evitando
          perda de prazos e informações espalhadas.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  logo: {
    width: 84,
    height: 84,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 20,
  },
  cardsContainer: {
    gap: 14,
  },
  footerBox: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ed145b',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
  },
});