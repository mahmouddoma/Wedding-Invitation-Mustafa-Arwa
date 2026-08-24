/**
 * Central wedding configuration — edit all wedding data from this one file.
 * No component code needs to change when updating names, dates, or links.
 */

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  groomFather: string;
  brideFather: string;
  weddingDate: string; // ISO 8601
  weddingTime: string; // display string
  venueName: string;
  locationUrl: string;
  locationQrImage: string;
  invitationTitle: string;
  bismillah: string;
  quranVerse: string;
  invitationIntro: string;
  invitationSubline: string;
  closingMessage: string;
  closingSubMessage: string;
  audioSrc: string;
}

export const WEDDING_CONFIG: WeddingConfig = {
  groomName: 'المهندس/ مصطفى ',
  brideName: 'الدكتورة/ أروى',
  groomFather: 'الأستاذ / أحمد مصطفى سيف النصر',
  brideFather: 'المهندس / أنور محمد عبد المجيد',
  weddingDate: '2026-10-02T20:00:00',
  weddingTime: 'الساعة 7:30 مساءً',
  venueName: 'Solitaire View Maadi',
  locationUrl: 'https://maps.app.goo.gl/CBHDohEnQavvzwNPA?g_st=ac',
  locationQrImage: 'location.jpeg',
  invitationTitle: 'دعوة زفاف',
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
  quranVerse:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  invitationIntro: 'يتشرف الأهل بدعوتكم لحضور حفل زفاف',
  invitationSubline: 'بحضوركم تكتمل فرحتنا، وبدعواتكم تبدأ أجمل حكايتنا',
  closingMessage: 'وجودكم يتمم فرحتنا',
  closingSubMessage: 'ننتظركم بكل الحب في ليلة لا تكتمل إلا بحضوركم',
  audioSrc: 'music.mp3',
};
