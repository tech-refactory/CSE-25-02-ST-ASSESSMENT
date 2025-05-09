const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatsSchema = new Schema({
  type: {
    type: String,
    enum: ['sales', 'orders'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Methods for getting and updating stats
StatsSchema.statics.getSalesValue = async function() {
  const salesStat = await this.findOne({ type: 'sales' });
  return salesStat ? salesStat.value : 0;
};

StatsSchema.statics.getOrdersValue = async function() {
  const ordersStat = await this.findOne({ type: 'orders' });
  return ordersStat ? ordersStat.value : 0;
};

StatsSchema.statics.updateSalesValue = async function(value) {
  return await this.findOneAndUpdate(
    { type: 'sales' },
    { value, updatedAt: Date.now() },
    { upsert: true, new: true }
  );
};

StatsSchema.statics.updateOrdersValue = async function(value) {
  return await this.findOneAndUpdate(
    { type: 'orders' },
    { value, updatedAt: Date.now() },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model('Stats', StatsSchema);