import React from 'react'
import { useState } from 'react'; // Agregar useState
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const listaProductos = [
    { "id": 1, "nombre": "Procesador Intel i9", "precio": 449990, "descripcion": "Procesador de alto rendimiento con 10 núcleos y 20 hilos, ideal para gaming y tareas pesadas.", "categoria": "Componentes" },
    { "id": 2, "nombre": "Tarjeta gráfica NVIDIA RTX 3080", "precio": 629990, "descripcion": "Tarjeta gráfica de última generación, excelente para juegos 4K y tareas de renderizado.", "categoria": "Componentes" },
    { "id": 3, "nombre": "Memoria RAM Corsair Vengeance 16GB", "precio": 71991, "descripcion": "Módulo de memoria RAM DDR4 de 16GB, ideal para multitarea y juegos exigentes.", "categoria": "Memoria" },
    { "id": 4, "nombre": "Placa base ASUS ROG Strix", "precio": 224991, "descripcion": "Placa base de alta calidad con soporte para overclocking, ideal para gamers y entusiastas.", "categoria": "Componentes" },
    { "id": 5, "nombre": "Disco SSD Samsung 970 EVO 1TB", "precio": 107991, "descripcion": "Unidad de estado sólido M.2 NVMe de 1TB, con altas velocidades de lectura y escritura.", "categoria": "Almacenamiento" },
    { "id": 6, "nombre": "Fuente de alimentación Corsair RM750x", "precio": 98991, "descripcion": "Fuente de alimentación modular de 750W con certificación 80+ Gold.", "categoria": "Componentes" },
    { "id": 7, "nombre": "Refrigeración líquida NZXT Kraken X63", "precio": 161991, "descripcion": "Sistema de refrigeración líquida con un radiador de 280mm, ideal para mantener temperaturas bajas en CPUs de alto rendimiento.", "categoria": "Refrigeración" },
    { "id": 8, "nombre": "Teclado mecánico Logitech G Pro", "precio": 116991, "descripcion": "Teclado mecánico con interruptores Romer-G, diseñado para eSports y gaming de alta velocidad.", "categoria": "Periféricos" },
    { "id": 9, "nombre": "Monitor ASUS ROG Swift 27\" 144Hz", "precio": 449991, "descripcion": "Monitor gaming con resolución 2560x1440 y frecuencia de actualización de 144Hz para un rendimiento gráfico fluido.", "categoria": "Pantallas" },
    { "id": 10, "nombre": "Mouse Logitech G502 HERO", "precio": 44991, "descripcion": "Mouse gaming con sensor HERO de 25K DPI, ergonómico y con botones programables.", "categoria": "Periféricos" },
    { "id": 11, "nombre": "Tarjeta de sonido Creative Sound BlasterX", "precio": 71991, "descripcion": "Tarjeta de sonido interna para una experiencia de audio envolvente en juegos y películas.", "categoria": "Audio" },
    { "id": 12, "nombre": "Altavoces Logitech Z623", "precio": 134991, "descripcion": "Altavoces con sistema de sonido 2.1 certificado THX para una calidad de audio profesional.", "categoria": "Audio" },
    { "id": 13, "nombre": "Unidad de disco duro Seagate Barracuda 2TB", "precio": 53991, "descripcion": "HDD de 2TB con alta capacidad de almacenamiento para backups y almacenamiento masivo de archivos.", "categoria": "Almacenamiento" },
    { "id": 14, "nombre": "Cámara web Logitech C920", "precio": 71991, "descripcion": "Cámara web Full HD 1080p con micrófono integrado, ideal para videollamadas y streaming.", "categoria": "Periféricos" },
    { "id": 15, "nombre": "Auriculares HyperX Cloud II", "precio": 89991, "descripcion": "Auriculares gaming con sonido envolvente 7.1 y micrófono con cancelación de ruido.", "categoria": "Audio" }
]


export default function Productos({ onAdd }) {

    //Estado de los filtros
    //Definimos el estado para el precio mínimo y máximo
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000000)
    //Definimos el estado para la categoría
    const [selectedCategory, setSelectedCategory] = useState("todos");

    // Estado para la lsta de productos que se mostrará
    const [filteredProducts, setFilteredProducts] = useState(listaProductos);

    //Función que se ejecuta al hacer click en el botón filtrar
    const handleFilterClick = () => {
        const newFilteredProducts = listaProductos.filter(product => {
            //Filtrado por precio
            const priceInRange = product.precio >= minPrice && product.precio <= maxPrice;

            //Filtrado por categoría
            const inSelectedCategory = selectedCategory === "todos" || product.categoria === selectedCategory;

            //El producto debe cumplir con ambas condiciones para ser inluido en el filtro
            return priceInRange && inSelectedCategory;
        })

        setFilteredProducts(newFilteredProducts)
    }

    return (
        <Container>
            <h2 className="page-title">Productos</h2>
            <div className='filter-container'>
                <label>
                    Precio mínimo:
                    <input
                        type='number'
                        value={minPrice}
                        onChange={e => setMinPrice(Number(e.target.value))}
                    />
                </label>
                <label>
                    Precio máximo:
                    <input
                        type='number'
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                    />
                </label>
                <label>
                    Categoría:
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="Componentes">Componentes</option>
                        <option value="Memoria">Memoria</option>
                        <option value="Almacenamiento">Almacenamiento</option>
                        <option value="Refrigeración">Refrigeración</option>
                        <option value="Periféricos">Periféricos</option>
                        <option value="Pantallas">Pantallas</option>
                        <option value="Audio">Audio</option>
                    </select>
                </label>
                <button onClick={handleFilterClick}>Filtrar</button>
            </div>

            <Row>
                {filteredProducts.map(p => (
                    <Col md={4} key={p.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{p.nombre}</Card.Title>
                                <Card.Text className="muted">Precio: ${p.precio.toLocaleString('es-CL')}</Card.Text>
                                <Button onClick={() => onAdd(p)}>Agregar al carrito</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
        </Container>
    )
}