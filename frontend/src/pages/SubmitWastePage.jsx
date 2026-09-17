import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Upload, Check, AlertCircle, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import API from '../services/api';

export default function SubmitWastePage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [activeTab, setActiveTab] = useState('manual'); // 'photo' or 'manual'
  const [categories, setCategories] = useState([]);
  
  const [itemTitle, setItemTitle] = useState(initialQuery);
  const [categoryCode, setCategoryCode] = useState('');
  const [conditionState, setConditionState] = useState('GOOD');
  const [estimatedQuantity, setEstimatedQuantity] = useState(2.0);
  const [unit, setUnit] = useState('KG');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [classifying, setClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (initialQuery) {
      handleAutoClassify(initialQuery);
    }
  }, [initialQuery]);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/waste/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleAutoClassify = async (queryText) => {
    setClassifying(true);
    try {
      const res = await API.post('/waste/classify', { query: queryText });
      if (res.data.success) {
        const data = res.data.data;
        setClassificationResult(data);
        setItemTitle(data.detectedItemTitle);
        setCategoryCode(data.detectedCategoryCode);
        setConditionState(data.suggestedCondition);
      }
    } catch (err) {
      console.error('Classification error:', err);
    } finally {
      setClassifying(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload URL & classification
      const fakeUrl = URL.createObjectURL(file);
      setImageUrl(fakeUrl);
      handleAutoClassify(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        itemTitle: itemTitle || 'Recyclable Waste Item',
        categoryCode: categoryCode || 'OTHER',
        conditionState,
        estimatedQuantity: parseFloat(estimatedQuantity),
        unit,
        description,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=60'
      };

      const res = await API.post('/waste', payload);
      if (res.data.success) {
        navigate('/recommendation', { state: { submission: res.data.data } });
      } else {
        setError(res.data.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting waste item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20">
          Signature Feature
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Find the Best Value for Your Waste
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Identify your unwanted item, calculate estimated monetary worth, and receive smart recommendations for Reuse, Donation, or Certified Recycling.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 gap-3 p-1.5 glass-card rounded-2xl border border-emerald-500/20 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('photo')}
          className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'photo' ? 'bg-eco-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
        >
          <Camera className="w-4 h-4" /> Option A: Upload Photo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'manual' ? 'bg-eco-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
        >
          <Sliders className="w-4 h-4" /> Option B: Select Manually
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/20 space-y-6">
        
        {/* OPTION A: PHOTO UPLOAD */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-300 block">Upload Item Photo</label>
            
            <div className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-8 text-center bg-emerald-950/20 transition-all cursor-pointer relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-900/60 text-eco-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Click or drag & drop item image</p>
                  <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Modular Classification Teaser Box */}
            {classifying && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3 animate-pulse">
                <Sparkles className="w-5 h-5 text-eco-400" />
                <span>Modular Classification Engine analyzing image tags and material signatures...</span>
              </div>
            )}

            {classificationResult && !classifying && (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-eco-400 font-bold">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Detected Category: {classificationResult.detectedCategoryName}</span>
                  <span>Confidence: {(classificationResult.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {classificationResult.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-dark-bg text-slate-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Item Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Item Title / Name</label>
            <input
              type="text"
              required
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="e.g. Old Android Phone, Stack of Newspapers"
              className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Waste Category</label>
            <select
              value={categoryCode}
              onChange={(e) => setCategoryCode(e.target.value)}
              className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select Category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.code}>
                  {cat.name} (Est. ₹{cat.minPricePerKg}-{cat.maxPricePerKg}/kg)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Condition & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Condition State</label>
            <select
              value={conditionState}
              onChange={(e) => setConditionState(e.target.value)}
              className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3 py-3 outline-none"
            >
              <option value="EXCELLENT">Excellent (Like New)</option>
              <option value="GOOD">Good (Functional)</option>
              <option value="FAIR">Fair (Scratched / Old)</option>
              <option value="POOR">Poor (Damaged / Scrap)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Quantity</label>
            <input
              type="number"
              step="0.5"
              min="0.1"
              value={estimatedQuantity}
              onChange={(e) => setEstimatedQuantity(e.target.value)}
              className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3 py-3 outline-none"
            >
              <option value="KG">Kilograms (KG)</option>
              <option value="ITEMS">Count / Items</option>
            </select>
          </div>

        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Item Description (Optional)</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about age, brand, functionality, or specific material notes..."
            className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl p-4 outline-none resize-none"
          />
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-extrabold text-base shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Analyzing Waste & Generating Recommendation...' : <>Generate Smart Recommendation <ArrowRight className="w-5 h-5" /></>}
        </button>

      </form>
    </div>
  );
}
