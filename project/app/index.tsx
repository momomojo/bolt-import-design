import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1920' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>GreenCare</Text>
          <Link href="/login" asChild>
            <Pressable style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Professional Lawn Care Made Simple</Text>
          <Text style={styles.subtitle}>
            Transform your lawn into a masterpiece with our network of trusted professionals.
            Book, manage, and enjoy hassle-free lawn care services.
          </Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✓ Easy Booking</Text>
              <Text style={styles.featureText}>Schedule services in minutes</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✓ Verified Pros</Text>
              <Text style={styles.featureText}>Expert service providers</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>✓ Guaranteed Quality</Text>
              <Text style={styles.featureText}>100% satisfaction guaranteed</Text>
            </View>
          </View>

          <Link href="/register" asChild>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Get Started Today</Text>
              <ArrowRight size={20} color="#ffffff" style={styles.ctaIcon} />
            </Pressable>
          </Link>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 GreenCare. All rights reserved.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  signInButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 800,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 48,
    maxWidth: 600,
    lineHeight: 28,
  },
  features: {
    width: '100%',
    maxWidth: 800,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 48,
  },
  featureItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 24,
    minWidth: 240,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  ctaIcon: {
    marginLeft: 4,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
});