import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CheckCircle, Info } from 'lucide-react';
import { cn } from '../utils/cn';
import axios from 'axios';

type Step = 1 | 2 | 3 | 4 | 5;

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

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 4) {
      handleNext();
    } else {
      try {
        const response = await axios.post("http://localhost:8000/auth/signup", formData, {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('User signed up:', response.data);
        setStep(5);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };
  const toggleCondition = (conditionName: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionName)
        ? prev.filter((name) => name !== conditionName)
        : [...prev, conditionName]
    );
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl border-2 border-[#A32E76]">
        {step < 5 ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'h-2 flex-1 rounded-full',
                      s <= step ? 'bg-[#A32E76]' : 'bg-gray-200',
                      s !== 4 && 'mr-2'
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-500">Step {step} of 4</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">
                    Welcome to LifeCourse!
                  </h2>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button variant="google" fullWidth className="mt-4 border-[#A32E76] text-[#A32E76]">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                         alt="Google" 
                         className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#A32E76] hover:text-[#871c5b]">Login</Link>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">Personal Information</h2>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <label className="block">
                    <span className="text-[#A32E76] font-medium">
                      Have you delivered a baby in the past 6 months or are you a caretaker?
                    </span>
                    <select
                      value={formData.deliveryStatus}
                      onChange={(e) => setFormData({ ...formData, deliveryStatus: e.target.value })}
                      className="mt-2 block w-full rounded-md border border-[#A32E76] bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A32E76] focus:ring-opacity-50 text-lg py-2 px-2"
                      required
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="postpartum">Postpartum</option>
                      <option value="preconception">Preconception</option>
                      <option value="pregnancy">Pregnancy</option>
                    </select>
                  </label>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold text-center text-[#A32E76] mb-6">Document Upload</h2>
                  {/* Commented out the file upload input */}
                  {/* <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData({ ...formData, birthCertificate: file });
                    }}
                    required
                  /> */}
                </>
              )}

              {step === 4 && (
                <>
                  <p className="text-xl  text-center  mb-6">
                    Choose from below eleven that why are you here (This will help us to provide curated healthcare content for you)
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {conditions.map((condition) => (
                      <div key={condition.name} className="relative">
                        {/* Condition Select Box */}
                        <label className="flex items-center gap-2 p-3 rounded-lg border w-full cursor-pointer hover:bg-[#A32E76]/10 border-[#A32E76]">
                          <input
                            type="checkbox"
                            checked={selectedConditions.includes(condition.name)}
                            onChange={() => toggleCondition(condition.name)}
                            className="form-checkbox h-4 w-4 text-[#A32E76] rounded"
                          />
                          {condition.name}
                        </label>

                        {/* Info Icon */}
                        <span
                          onClick={() => setActiveInfo(activeInfo === condition.name ? null : condition.name)}
                          className="absolute right-3 top-3 text-[#A32E76] hover:text-[#871c5b] cursor-pointer"
                        >
                          <Info size={16} />
                        </span>

                        {/* Info Popup */}
                        {activeInfo === condition.name && (
                          <div className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-lg border border-[#A32E76] text-sm">
                            {condition.info}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Button type="submit" fullWidth className="bg-[#A32E76] hover:bg-[#871c5b] text-white">
                {step === 4 ? 'Complete Registration' : 'Next'}
              </Button>
            </form>
          </>
        ) : (
          // Success Screen (Step 5)
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-[#A32E76]" />
            <h2 className="text-2xl font-semibold text-[#A32E76] mb-2">Registration Completed!</h2>
            <p className="text-gray-600 mb-6">
              Your account is being processed. Verification may take up to 24 hours.
            </p>
            <Link to="/login" className="block w-full text-center bg-[#A32E76] hover:bg-[#871c5b] text-white py-2 rounded-lg">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
