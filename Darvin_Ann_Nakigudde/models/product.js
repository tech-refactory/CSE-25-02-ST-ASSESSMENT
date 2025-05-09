const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  color: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique product ID before saving
ProductSchema.pre('save', async function(next) {
  if (!this.productId) {
    const count = await mongoose.model('Product').countDocuments();
    this.productId = `#${645340 + count + 1}`;
  }
  next();
});

// Virtual for checking if product is in stock
ProductSchema.virtual('inStock').get(function() {
  return this.quantity > 0;
});

// Methods for product stats
ProductSchema.statics.getTotalProducts = async function() {
  return await this.countDocuments();
};

ProductSchema.statics.getTotalValue = async function() {
  const result = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$price", "$quantity"] } }
      }
    }
  ]);
  return result.length > 0 ? result[0].total : 0;
};

ProductSchema.statics.getOutOfStockCount = async function() {
  return await this.countDocuments({ quantity: 0 });
};

module.exports = mongoose.model('Product', ProductSchema);