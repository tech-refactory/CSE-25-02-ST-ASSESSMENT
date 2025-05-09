import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Setup file storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
    }
  }
});

// Initialize JSON data file
const productsFilePath = path.join(dataDir, 'products.json');
if (!fs.existsSync(productsFilePath)) {
  const initialData = [
    {
      id: '#645341',
      name: 'Sumsang s25+ Ultra',
      category: 'Smart Phones',
      price: 6900000,
      quantity: 981,
      color: 'Black',
      imageUrl: ''
    },
    {
      id: '#645346',
      name: 'Gucci XXL Shirt',
      category: 'Fashion',
      price: 500000,
      quantity: 100,
      color: 'Red',
      imageUrl: ''
    },
    {
      id: '#645342',
      name: 'XL Zara Shirt',
      category: 'Fashion',
      price: 600000,
      quantity: 56,
      color: 'Blue',
      imageUrl: ''
    },
    {
      id: '#645344',
      name: 'iPhone 15',
      category: 'Smart Phones',
      price: 7900000,
      quantity: 752,
      color: 'Silver',
      imageUrl: ''
    },
    {
      id: '#645343',
      name: 'Smart home Curtain',
      category: 'Interior Design',
      price: 500000,
      quantity: 30,
      color: 'White',
      imageUrl: ''
    },
    {
      id: '#645345',
      name: 'Spectrum Laptop 14.6 Inc',
      category: 'Laptops',
      price: 15800000,
      quantity: 144,
      color: 'Gray',
      imageUrl: ''
    }
  ];
  fs.writeFileSync(productsFilePath, JSON.stringify(initialData, null, 2));
}

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Helper functions
const getProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
};

const saveProducts = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing products file:', error);
    return false;
  }
};

// Routes
app.get('/api/products', (req, res) => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;
    
    // Validate required fields
    if (!name || !category || !price || quantity === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const products = getProducts();
    
    // Generate a new product ID with # prefix
    const id = `#${Math.floor(100000 + Math.random() * 900000)}`;
    
    const newProduct = {
      id,
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      color: color || '',
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };
    
    products.push(newProduct);
    
    if (saveProducts(products)) {
      res.status(201).json(newProduct);
    } else {
      res.status(500).json({ error: 'Failed to save product' });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/products/:id', upload.single('image'), (req, res) => {
  try {
    const { name, category, price, quantity, color } = req.body;
    const products = getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = {
      ...products[index],
      name: name || products[index].name,
      category: category || products[index].category,
      price: price ? Number(price) : products[index].price,
      quantity: quantity !== undefined ? Number(quantity) : products[index].quantity,
      color: color || products[index].color
    };
    
    if (req.file) {
      // Remove old image if exists
      if (products[index].imageUrl) {
        const oldImagePath = path.join(__dirname, '..', products[index].imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedProduct.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    products[index] = updatedProduct;
    
    if (saveProducts(products)) {
      res.json(updatedProduct);
    } else {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const products = getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Remove image file if it exists
    if (products[index].imageUrl) {
      const imagePath = path.join(__dirname, '..', products[index].imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    products.splice(index, 1);
    
    if (saveProducts(products)) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});