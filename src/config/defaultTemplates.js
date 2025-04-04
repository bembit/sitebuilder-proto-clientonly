// src/config/defaultTemplates.js
export const defaultTemplates = [
  {
    name: 'Landing Page',
    data: {
      pageStructure: [
        // Header Section
        { id: 'elem1741462917550', type: 'text', section: 'header' },
        { id: 'elem1741462917994', type: 'text', section: 'header' },
        { id: 'elem1741462918349', type: 'text', section: 'header' },
        { id: 'elem1741462918722', type: 'text', section: 'header' },
        { id: 'elem1741462919111', type: 'text', section: 'header' },
        { id: 'elem1741462919849', type: 'text', section: 'header' },
        { id: 'elem1741462920954', type: 'button', section: 'header' },
        // Hero Section
        { id: 'elem1741463055126', type: 'text', section: 'hero' },
        { id: 'elem1741463056839', type: 'text', section: 'hero' },
        { id: 'elem1741463076728', type: 'button', section: 'hero' },
        { id: 'elem1741463077260', type: 'button', section: 'hero' },
        { id: 'elem1741463148416', type: 'image', section: 'hero' },
        { id: 'elem1741463149623', type: 'heading', section: 'hero' },
        // About Section
        { id: 'elem1741463225185', type: 'image', section: 'about' },
        { id: 'elem1741463225688', type: 'image', section: 'about' },
        { id: 'elem1741463226050', type: 'image', section: 'about' },
        { id: 'elem1741463226429', type: 'image', section: 'about' },
        { id: 'elem1741463227310', type: 'image', section: 'about' },
        { id: 'elem1741463232018', type: 'heading', section: 'about' },
        { id: 'elem1741463243345', type: 'image', section: 'about' },
        // Additional Sections
        { id: 'section-1741524541059', name: 'Why us', type: 'section' },
        { id: 'section-1741694129389', name: 'jkasd', type: 'section' },
      ],
      sectionOrder: [
        'header',
        'hero',
        'about',
        'customers',
        'services',
        'footer',
        'section-1741524541059',
        'section-1741694129389',
      ],
      settings: {
        elem1741462917550: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462917994: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462918349: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462918722: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462919111: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462919849: { content: 'New Text', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462920954: { content: 'Learn more', fontSize: '14px', color: '#000', type: 'button', backgroundColor: '#fff', fontFamily: 'Poppins' },
        elem1741463055126: { content: 'Expensive store', fontSize: '96px', color: '#aeaeae', type: 'text', fontFamily: 'Poppins' },
        elem1741463056839: { content: 'Welcome to the expensive store. We sell the same, but for a lot more.', fontSize: '20px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741463076728: { content: 'Learn more', fontSize: '16px', color: '#000', type: 'button', backgroundColor: '#fff', fontFamily: 'Poppins', marginBottom: '55px' },
        elem1741463077260: { content: 'Learn more', fontSize: '16px', color: '#ffffff', type: 'button', backgroundColor: '#ff00f6', fontFamily: 'Poppins', marginBottom: '55px' },
        elem1741463148416: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463149623: { content: 'New Heading', fontSize: '32px', color: '#fff', type: 'heading', level: 'h1', fontFamily: 'Poppins' },
        elem1741463225185: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderColor: '#ff00fa', borderWidth: '5px', borderStyle: 'solid' },
        elem1741463225688: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderWidth: '10px', borderStyle: 'solid', borderColor: '#00ff05' },
        elem1741463226050: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderWidth: '15px', borderColor: '#00ffdb', borderStyle: 'solid' },
        elem1741463226429: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463227310: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463232018: { content: 'Stretched Images.', fontSize: '46px', color: '#fff', type: 'heading', level: 'h1', fontFamily: 'Poppins' },
        elem1741463243345: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
      },
      sectionStyles: {
        about: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'flex-start' },
        header: { alignItems: 'center' },
        hero: { flexDirection: 'column' },
      },
      highlightSections: true,
    },
  },
  {
    name: 'Image Gallery',
    data: {
      pageStructure: [
        // Header Section
        { id: 'elem1741462917550', type: 'text', section: 'header' },
        { id: 'elem1741462920954', type: 'button', section: 'header' },
        // Gallery Section
        { id: 'elem1741463225185', type: 'image', section: 'gallery' },
        { id: 'elem1741463225688', type: 'image', section: 'gallery' },
        { id: 'elem1741463226050', type: 'image', section: 'gallery' },
        { id: 'elem1741463226429', type: 'image', section: 'gallery' },
        { id: 'elem1741463227310', type: 'image', section: 'gallery' },
        { id: 'elem1741463243345', type: 'image', section: 'gallery' },
        { id: 'elem1741463232018', type: 'heading', section: 'gallery' },
        // Footer Section
        { id: 'elem1741463056839', type: 'text', section: 'footer' },
      ],
      sectionOrder: ['header', 'gallery', 'footer'],
      settings: {
        elem1741462917550: { content: 'Gallery', fontSize: '24px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
        elem1741462920954: { content: 'Back', fontSize: '14px', color: '#000', type: 'button', backgroundColor: '#fff', fontFamily: 'Poppins' },
        elem1741463225185: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderColor: '#ff00fa', borderWidth: '5px', borderStyle: 'solid' },
        elem1741463225688: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderWidth: '10px', borderStyle: 'solid', borderColor: '#00ff05' },
        elem1741463226050: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image', borderWidth: '15px', borderColor: '#00ffdb', borderStyle: 'solid' },
        elem1741463226429: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463227310: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463243345: { src: 'https://randomuser.me/api/portraits/women/21.jpg', type: 'image' },
        elem1741463232018: { content: 'Image Gallery', fontSize: '46px', color: '#fff', type: 'heading', level: 'h1', fontFamily: 'Poppins' },
        elem1741463056839: { content: '© 2025 Your Site', fontSize: '16px', color: '#fff', type: 'text', fontFamily: 'Poppins' },
      },
      sectionStyles: {
        header: { alignItems: 'center', backgroundColor: '#333' },
        gallery: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' },
        footer: { textAlign: 'center', padding: '10px' },
      },
      highlightSections: false,
    },
  }
];