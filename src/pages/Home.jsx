// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// DEMO: fuente de datos en JS (luego la moveremos a /data/products.js)
const productos = [
  { id:'cl-2024', nombre:'Camisa Clásica Verano', precio:8990, categoria:'mujer', img:'/src/assets/img/Camisa_clasica.jpg', oferta:true },
  { id:'arg-2024', nombre:'Pantalón de Vestir', precio:12990, categoria:'hombre', img:'/src/assets/img/Jeans_claro.jpg' },
  { id:'ita-2024', nombre:'Vestido Floral', precio:14990, categoria:'hombre', img:'/arcane/vestido-mujer-1.jpg' },
  { id:'jean-01', nombre:'Falda Clásica Verano', precio:9990, categoria:'hombre', img:'/src/assets/img/falda-clasica.jpg', oferta:true },
];

export default function Home(){
  const navigate = useNavigate();
  const ofertas = productos.filter((_,i)=> i % 2 === 0);

  // Testimonios rotativos
  const testimonios = React.useMemo(()=>[
    "Excelente calidad!", "Volveré a comprar.", "Muy rápido el envío."
  ], []);
  const [idx,setIdx] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=> setIdx(i => (i+1)%testimonios.length), 3000);
    return ()=> clearInterval(id);
  },[testimonios.length]);

  return (
    <>
      {/* Banner portada (sin texto encima) */}
      <Container className="mt-3">
        <div
          className="banner-header"
          style={{ backgroundImage: "url('/arcane/hero.jpg')" }}
          aria-hidden="true"
        />
        {/* Título debajo del banner */}
        <h2 className="mt-3 text-center fw-bold">ArcaneGad — Tu tienda de Ropa</h2>
      </Container>


      {/* Novedades / destacados */}
      <Container className="mb-5">
        <h3 className="mb-3">Novedades</h3>
        <Row xs={1} sm={2} md={3} lg={4}>
          {productos.map(p=>(
            <Col key={p.id} className="mb-4">
              <Card className="arcane h-100">
                <Card.Img variant="top" src={p.img} alt={p.nombre}/>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span>{p.nombre}</span>
                    {p.oferta && <Badge bg="secondary">Oferta</Badge>}
                  </Card.Title>
                  <Card.Text>${p.precio.toLocaleString('es-CL')}</Card.Text>
                  <div className="d-flex gap-2">
                    <Button variant="primary" onClick={()=>navigate(`/productos/${p.id}`)}>Ver</Button>
                    
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Ofertas (simple) */}
      <Container className="mb-5">
        <h3 className="mb-3">Ofertas</h3>
        <Row xs={1} md={2} lg={3}>
          {ofertas.map(p=>(
            <Col key={p.id} className="mb-3">
              <Card className="arcane">
                <Card.Body className="d-flex justify-content-between">
                  <div>{p.nombre}</div>
                  <div><Badge bg="secondary">-${Math.round(p.precio*0.1).toLocaleString('es-CL')}</Badge></div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonios + Newsletter */}
      <Container className="pb-5">
        <Row className="g-3">
          <Col md={6}>
            <Card className="arcane p-3">
              <h5 className="mb-2">Lo que dicen</h5>
              <p className="mb-0">{testimonios[idx]}</p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="arcane p-3">
              <h5 className="mb-2">Newsletter</h5>
              <form onSubmit={(e)=>{e.preventDefault(); alert("¡Gracias por suscribirte!");}}>
                <div className="d-flex gap-2">
                  <input type="email" required placeholder="tu@correo.cl" className="form-control"/>
                  <Button type="submit" variant="outline-success">Suscribirme</Button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
