const { test, describe } = require('node:test');
const assert = require('node:assert');

// Pure cart helper functions reflecting frontend logic
function calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateSavings(items) {
    return items.reduce((sum, item) => {
        const originalPrice = item.originalPrice || item.price;
        return sum + Math.max(0, originalPrice - item.price) * item.quantity;
    }, 0);
}

function addItemToCart(cart, product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
        return cart.map((item, index) => 
            index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...cart, { ...product, quantity: 1 }];
}

function removeItemFromCart(cart, productId) {
    return cart.filter(item => item.id !== productId);
}

function updateQuantity(cart, productId, quantity) {
    if (quantity <= 0) {
        return removeItemFromCart(cart, productId);
    }
    return cart.map(item => item.id === productId ? { ...item, quantity } : item);
}

function filterProducts(products, filter) {
    if (filter === 'todos') return products;
    if (filter === 'caes') return products.filter(p => p.species === 'caes');
    if (filter === 'gatos') return products.filter(p => p.species === 'gatos');
    if (filter === 'farmacia') return products.filter(p => p.category === 'farmacia');
    return products;
}

function validateBookingData(booking) {
    const errors = [];
    if (!booking.service) errors.push('Serviço obrigatório');
    if (!booking.date || !booking.time) errors.push('Data e horário obrigatórios');
    if (!booking.petName) errors.push('Nome do pet obrigatório');
    if (!booking.tutorName) errors.push('Nome do tutor obrigatório');
    if (!booking.tutorPhone) errors.push('WhatsApp de contato obrigatório');
    return {
        isValid: errors.length === 0,
        errors
    };
}

describe('Cart Business Logic Suite', () => {
    const sampleProduct1 = {
        id: 1,
        species: 'caes',
        name: 'Ração Golden Special Adultos',
        price: 159.90,
        originalPrice: 189.90,
        category: 'alimentacao'
    };

    const sampleProduct2 = {
        id: 2,
        species: 'gatos',
        name: 'Ração Premier Gatos Castrados',
        price: 134.90,
        originalPrice: 159.00,
        category: 'alimentacao'
    };

    test('adds an item to an empty cart with quantity 1', () => {
        const cart = addItemToCart([], sampleProduct1);
        assert.strictEqual(cart.length, 1);
        assert.strictEqual(cart[0].quantity, 1);
        assert.strictEqual(cart[0].id, 1);
    });

    test('increments quantity when adding same product twice', () => {
        let cart = addItemToCart([], sampleProduct1);
        cart = addItemToCart(cart, sampleProduct1);
        assert.strictEqual(cart.length, 1);
        assert.strictEqual(cart[0].quantity, 2);
    });

    test('calculates correct subtotal with multiple items and quantities', () => {
        let cart = addItemToCart([], sampleProduct1); // 159.90
        cart = addItemToCart(cart, sampleProduct1);     // 159.90
        cart = addItemToCart(cart, sampleProduct2);     // 134.90
        
        const subtotal = calculateSubtotal(cart);
        const expected = (159.90 * 2) + 134.90; // 454.70
        assert.strictEqual(subtotal.toFixed(2), expected.toFixed(2));
    });

    test('calculates customer savings accurately from anchored prices', () => {
        let cart = addItemToCart([], sampleProduct1); // saves 30.00
        cart = addItemToCart(cart, sampleProduct2);     // saves 24.10
        
        const savings = calculateSavings(cart);
        const expected = 30.00 + 24.10; // 54.10
        assert.strictEqual(savings.toFixed(2), expected.toFixed(2));
    });

    test('removes an item completely from cart', () => {
        let cart = addItemToCart([], sampleProduct1);
        cart = addItemToCart(cart, sampleProduct2);
        cart = removeItemFromCart(cart, 1);
        
        assert.strictEqual(cart.length, 1);
        assert.strictEqual(cart[0].id, 2);
    });

    test('updates item quantity and removes item if quantity set to 0', () => {
        let cart = addItemToCart([], sampleProduct1);
        cart = updateQuantity(cart, 1, 5);
        assert.strictEqual(cart[0].quantity, 5);

        cart = updateQuantity(cart, 1, 0);
        assert.strictEqual(cart.length, 0);
    });
});

describe('Catalog & Species Balance Suite', () => {
    const catalog = [
        { id: 1, species: 'caes', category: 'alimentacao' },
        { id: 2, species: 'gatos', category: 'alimentacao' },
        { id: 3, species: 'caes', category: 'farmacia' },
        { id: 4, species: 'gatos', category: 'farmacia' }
    ];

    test('filters dog products correctly', () => {
        const dogs = filterProducts(catalog, 'caes');
        assert.strictEqual(dogs.length, 2);
        assert.ok(dogs.every(p => p.species === 'caes'));
    });

    test('filters cat products correctly', () => {
        const cats = filterProducts(catalog, 'gatos');
        assert.strictEqual(cats.length, 2);
        assert.ok(cats.every(p => p.species === 'gatos'));
    });

    test('filters pharmacy products correctly across species', () => {
        const pharmacy = filterProducts(catalog, 'farmacia');
        assert.strictEqual(pharmacy.length, 2);
        assert.ok(pharmacy.every(p => p.category === 'farmacia'));
    });
});

describe('Multi-Step Booking Wizard Validation Suite', () => {
    test('validates complete booking data as valid', () => {
        const validBooking = {
            service: 'Consulta Exclusiva Felina Cat-Friendly',
            date: '2026-09-10',
            time: '14:00',
            petName: 'Luna',
            petSpecies: 'Gato 🐱',
            tutorName: 'Mariana Silva',
            tutorPhone: '(11) 98888-7777'
        };

        const result = validateBookingData(validBooking);
        assert.strictEqual(result.isValid, true);
        assert.strictEqual(result.errors.length, 0);
    });

    test('flags missing required fields in booking', () => {
        const incompleteBooking = {
            service: 'Banho e Tosa Especializado',
            date: '2026-09-10',
            time: '',
            petName: '',
            tutorName: 'Carlos',
            tutorPhone: ''
        };

        const result = validateBookingData(incompleteBooking);
        assert.strictEqual(result.isValid, false);
        assert.ok(result.errors.includes('Data e horário obrigatórios'));
        assert.ok(result.errors.includes('Nome do pet obrigatório'));
        assert.ok(result.errors.includes('WhatsApp de contato obrigatório'));
    });
});
