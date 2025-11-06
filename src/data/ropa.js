  
  
  // src/data/ropa.js
// Coloca las imágenes en /public/arcane/ con estos nombres.
const ropa = [
  // CAMISAS (hombre)
  { id: 'ch-001', nombre: 'Camisa Casual Hombre', descripcion: 'Algodón popelina, manga larga, fit regular.', precio: 12990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-1.jpg', oferta: true },
  { id: 'ch-002', nombre: 'Camisa Oxford Blanca', descripcion: 'Tejido Oxford, cuello button-down, fácil planchado.', precio: 15990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-2.jpg' },
  { id: 'ch-003', nombre: 'Camisa Denim', descripcion: 'Denim liviano, bolsillos frontales, look casual.', precio: 18990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-3.jpg' },
  { id: 'ch-004', nombre: 'Camisa a Cuadros', descripcion: 'Franela suave, patrón tartán, ideal clima frío.', precio: 16990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-4.jpg', oferta: true },
  { id: 'ch-005', nombre: 'Camisa de Lino', descripcion: 'Lino 55% + algodón, fresca y respirable.', precio: 20990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-5.jpg' },
  { id: 'ch-006', nombre: 'Camisa Rayas Azul', descripcion: 'Popelina a rayas, corte moderno, cuello clásico.', precio: 17990, categoria: 'hombre', tipo: 'camisa', img: '/arcane/camisa-hombre-6.jpg' },

  // PANTALONES (hombre)
  { id: 'pa-001', nombre: 'Pantalón Jeans Slim', descripcion: 'Denim 12oz, calce slim, 5 bolsillos.', precio: 25990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-1.jpg' },
  { id: 'pa-002', nombre: 'Pantalón Chino', descripcion: 'Gabardina elástica, corte tapered, cómodo diario.', precio: 23990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-2.jpg', oferta: true },
  { id: 'pa-003', nombre: 'Pantalón Cargo', descripcion: 'Bolsillos laterales, resistente, estilo urbano.', precio: 27990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-3.jpg' },
  { id: 'pa-004', nombre: 'Pantalón Jogger', descripcion: 'Algodón con spandex, pretina elástica, puño en tobillo.', precio: 22990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-4.jpg' },
  { id: 'pa-005', nombre: 'Pantalón Straight', descripcion: 'Corte recto, denim clásico, versátil.', precio: 24990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-5.jpg', oferta: true },
  { id: 'pa-006', nombre: 'Pantalón de Vestir', descripcion: 'Tejido sastrero, plancha marcada, formal.', precio: 29990, categoria: 'hombre', tipo: 'pantalon', img: '/arcane/pantalon-hombre-6.jpg' },

  // VESTIDOS (mujer)
  { id: 'vm-001', nombre: 'Vestido Floral', descripcion: 'Viscosa suave, largo midi, forro interior.', precio: 34990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-1.jpg', oferta: true },
  { id: 'vm-002', nombre: 'Vestido Negro Corte A', descripcion: 'Tela punto roma, realza cintura, elegante.', precio: 32990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-2.jpg' },
  { id: 'vm-003', nombre: 'Vestido Satinado', descripcion: 'Satén liviano, caída fluida, tirantes ajustables.', precio: 37990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-3.jpg' },
  { id: 'vm-004', nombre: 'Vestido Denim', descripcion: 'Denim suave, botones frontales, casual.', precio: 29990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-4.jpg' },
  { id: 'vm-005', nombre: 'Vestido Largo Boho', descripcion: 'Gasa estampada, vuelo amplio, mangas abullonadas.', precio: 38990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-5.jpg', oferta: true },
  { id: 'vm-006', nombre: 'Vestido Camisero', descripcion: 'Popelina, cinturón incluido, versátil.', precio: 31990, categoria: 'mujer', tipo: 'vestido', img: '/arcane/vestido-mujer-6.jpg' },

  // FALDAS (mujer)
  { id: 'fm-001', nombre: 'Falda Tableada', descripcion: 'Poliéster liviano, tiro alto, pretina elástica.', precio: 19990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-1.jpg' },
  { id: 'fm-002', nombre: 'Falda Lápiz', descripcion: 'Efecto moldeador, largo a la rodilla, oficina.', precio: 22990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-2.jpg' },
  { id: 'fm-003', nombre: 'Falda Midi Plisada', descripcion: 'Plisado fino, movimiento fluido, elegante.', precio: 24990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-3.jpg', oferta: true },
  { id: 'fm-004', nombre: 'Falda Denim', descripcion: 'Denim azul, ruedo desflecado, casual.', precio: 21990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-4.jpg' },
  { id: 'fm-005', nombre: 'Falda Satinada', descripcion: 'Satén con brillo, sesgo al bies, cómoda.', precio: 26990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-5.jpg' },
  { id: 'fm-006', nombre: 'Falda A-Línea Corta', descripcion: 'Corte A, cierre trasero, diaria.', precio: 20990, categoria: 'mujer', tipo: 'falda', img: '/arcane/falda-mujer-6.jpg', oferta: true },
];

export { ropa };        // <- named export
export default ropa;    // <- default export (para que funcione de ambas formas)
