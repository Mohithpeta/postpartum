import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
// import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import axios from 'axios';
import LifeCourseLogo  from '../assets/Lifecourse Logo.png';
type Step = 1 | 2 | 3 | 4 | 5 | 6;

type Condition = {
  name: string;
  info: string;
};

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    deliveryStatus: '',
    documentType: '',
    deliveryType: '',
    babyBirthDate: '',
    hypertensionStage: '',
    role: 'user',
  });

  const conditions: Condition[] = [
    { name: 'Hypertension', info: 'High Blood pressure, Headache, Shortness of breath, Lightheadedness, Tiredness, Vomiting Sensation, Heart Palpitations.' },
    { name: 'Urinary Incontinence', info: 'Leaking Urine while Laughing, Coughing, Sneezing & doing vigorous activities without control.' },
    { name: 'Depression', info: 'Sleep Disturbance, Sense of detachment from Child, Overwhelmed feeling, Irritability, Suicidal Ideation.' },
    { name: 'Postpartum Anxiety', info: 'Excessive worry, Tiredness, Irritability, No concentration, Sleepless.' },
    { name: 'Secondary Infertility', info: 'If you are not able to conceive again after having a child??' },
    { name: 'Pelvic Organ Prolapse', info: 'Heaviness around lower abdomen & genitals, dragging sensation in vagina, bulge/lump protruding outside.' },
    { name: 'Dyspareunia', info: 'Pain during sex, Decreased sex drive, Vaginal dryness.' },
    { name: 'Obesity', info: ' If your BMI (Body Mass Index) is greater than 30 kg/m2' },
    { name: 'Backpain', info: 'Muscle ache, Pain radiating down a leg, Shooting/Stabbing Sensation.' },
    { name: 'Anal Incontinence', info: 'Involuntary passing of gas/stool, Constipation, Bloating, Hemorrhoids/Piles.' }
  ];

  const hypertensionOptions = [
    'To know about Hypertension',
    'Lifestyle Changes to Control Hypertension',
    'Diagnosed Hypertension',
    'Having symptoms of Hypertension',
    'Managing Hypertension Through Diet and Nutrition',
    'Exercises Safe for Hypertension Recovery',
    'Others'
  ];

  const handleNext = () => {
    setStep((prev) => {
      if (prev === 4 && selectedConditions.includes('Hypertension')) {
        return 5; // Add hypertension stage screen for users who selected hypertension
      } else if (prev === 4 || prev === 5) {
        return 6; // Final success screen
      } else {
        return (prev + 1) as Step;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
  
    if (step < 6) {
      handleNext();
    } else {
      try {
        const apiBase = process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:8000'
          : 'https://deepvital-backend.onrender.com';
  
        const response = await axios.post(`${apiBase}/auth/signup/user`, {
          ...formData,
          selectedConditions
        }, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        console.log('User signed up:', response.data);
        // Registration successful, redirect to login after delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Error during signup:', error);
        if (axios.isAxiosError(error)) {
          Error(error.response?.data?.detail || 'An error occurred during signup. Please try again.');
        } else {
          Error('An unexpected error occurred. Please try again.');
        }
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleCondition = (conditionName: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionName)
        ? prev.filter((name) => name !== conditionName)
        : [...prev, conditionName]
    );
  };

  const toggleHypertensionStage = (stage: string) => {
    setFormData({...formData, hypertensionStage: 
      formData.hypertensionStage === stage ? '' : stage
    });
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {/* Logo */}
        <div className="absolute top-8 left-8">
            <Link to="/">
            <div className="flex items-center">
              <div className="flex">
              <div className="text-[#5E17EB] font-bold text-2xl">
                <span className="inline-flex items-center">
                <img src={LifeCourseLogo} alt="LifeCourse Logo" width="auto" height="auto" />
                <span className="ml-1"></span>
                <sup className="text-xs">®</sup>
                </span>
              </div>
              </div>
            </div>
            </Link>
        </div>

        {step === 6 ? (
          // Success Screen
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-[#5E17EB] rounded-md flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Successfully</h2>
            <Link to="/login" className="block w-full text-center bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-3 px-4 rounded-md font-medium">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-10 mt-16">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'h-1 flex-1 rounded-full',
                      s <= step ? 'bg-[#5E17EB]' : 'bg-gray-200',
                      s !== 4 && 'mr-2'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Header text */}
            {step === 1 ? (
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-gray-800">Welcome To LifeCourse!</h2>
                <p className="text-gray-600">To begin the Journey, SignUp!</p>
              </div>
            ) : (
              <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-gray-800">Let Lifecourse Know about You;</h2>
                <p className="text-gray-600">You'll know everything through the course</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <Button variant="google" fullWidth className="border border-gray-300 bg-white text-gray-800 py-3">
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                           alt="Google" 
                           className="w-5 h-5 mr-2" />
                      Continue with Google
                    </Button>
                    
                    <div className="flex items-center">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span className="px-4 text-sm text-gray-500">or</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        placeholder="Enter E-mail id"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                        required
                      />
                       <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
                    </div>
                    
                    <Button type="submit" fullWidth className="bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-3">
                      Sign Up →
                    </Button>
                    
                    <p className="text-center text-sm mt-4">
                      Already have an account?{' '}
                      <Link to="/login" className="text-[#5E17EB] hover:text-[#4b12c9] font-medium">Login</Link>
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Have you delivered a baby within the past 6 months? / Are you a caretaker
                      </label>
                      <div className="relative">
                        <select
                          value={formData.deliveryStatus}
                          onChange={(e) => setFormData({ ...formData, deliveryStatus: e.target.value })}
                          className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                          required
                        >
                          <option value="" disabled>Select</option>
                          <option value="postpartum">Postpartum</option>
                          <option value="preconception">Preconception</option>
                          <option value="pregnancy">Pregnancy</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" fullWidth className="bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-3">
                        Next →
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Please Choose one of the following documents for verification:
                      </label>
                      <div className="relative">
                        <select
                          value={formData.documentType}
                          onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                          className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E17EB]"
                          required
                        >
                          <option value="" disabled>Select</option>
                          <option value="birthCertificate">Birth Certificate</option>
                          <option value="prescriptionLetter">Doctor's Prescription</option>
                          <option value="hospitalRecord">Hospital Record</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute right-12 top-52">
                        <div className="flex items-center justify-center rounded-full w-6 h-6 bg-[#FF3B8B] text-white text-xs font-bold">
                          D
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Upload Birth Certificate
                      </label>
                      <div className="flex">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                        >
                          <span className="text-gray-500">Upload</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </button>
                      </div>
                      <div className="absolute right-12 top-80">
                        <div className="flex items-center justify-center rounded-full w-6 h-6 bg-[#FF3B8B] text-white text-xs font-bold">
                          D
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right pt-8">
                      <Button type="submit" className="bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-2 px-6 rounded-md">
                        Next →
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div>
                    <p className="text-gray-700 mb-5">
                      Choose from below options that why are you Here (This will help us to provide curated healthcare content for you)
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {conditions.slice(0, 10).map((condition) => (
                        <div key={condition.name} className="relative">
                          <label className="flex items-center p-3 rounded-md border border-gray-300 hover:border-[#5E17EB]/70 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedConditions.includes(condition.name)}
                              onChange={() => toggleCondition(condition.name)}
                              className="form-checkbox h-4 w-4 text-[#5E17EB] border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm">{condition.name}</span>
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => setActiveInfo(activeInfo === condition.name ? null : condition.name)}
                            className="absolute right-3 top-3 text-[#5E17EB]"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                          </button>
                          
                          {activeInfo === condition.name && (
                            <div className="absolute z-10 right-0 top-full mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 w-72 text-sm">
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">Choose {condition.name} if have the combinations of the symptoms given below:</p>
                                <button 
                                  type="button" 
                                  onClick={() => setActiveInfo(null)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                              <p className="text-gray-600">{condition.info}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-right pt-8">
                      <Button type="submit" className="bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-2 px-6 rounded-md">
                        Next →
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div>
                    <p className="text-gray-700 mb-5">
                      In which stage are you in hypertension? This will help us to provide curated healthcare content for you
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {hypertensionOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleHypertensionStage(option)}
                          className={`p-3 rounded-md text-center text-sm ${
                            formData.hypertensionStage === option
                              ? 'bg-[#5E17EB] text-white'
                              : 'bg-[#5E17EB]/10 text-[#5E17EB] hover:bg-[#5E17EB]/20'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <div className="text-right pt-8">
                      <Button type="submit" className="bg-[#5E17EB] hover:bg-[#4b12c9] text-white py-2 px-6 rounded-md">
                        Submit →
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}