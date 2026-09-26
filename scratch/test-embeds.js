import https from 'node:https';

const urls = [
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120645.2!2d73.0497024!3d19.021824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVIJAY%20TOURS%20AND%20TRAVELS!5e0!3m2!1sen!2sin',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021393.4900078462!2d73.0497024!3d19.021824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c23439b1a139%3A0x2417aa53b81a1394!2sVijay%20Tours%20and%20Travels!5e0!3m2!1sen!2sin',
  'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=VIJAY%20TOURS%20AND%20TRAVELS+(Vijay%20Tours%20and%20Travels)&t=&z=14&ie=UTF8&iwloc=B&output=embed'
];

urls.forEach((url, i) => {
  https.get(url, (res) => {
    console.log(`URL ${i}: status ${res.statusCode}, x-frame-options: ${res.headers['x-frame-options']}`);
  }).on('error', e => console.error(i, e.message));
});
