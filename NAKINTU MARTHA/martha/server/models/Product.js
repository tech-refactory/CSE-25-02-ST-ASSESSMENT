import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => Math.floor(100000 + Math.random() * 900000).toString(),
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative']
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Virtual for checking if product is out of stock
productSchema.virtual('outOfStock').get(function() {
  return this.quantity === 0;
});

const Product = mongoose.model('Product', productSchema);

export default Product;