import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

type Step = 1 | 2 | 3 | 4;

export function Register() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    birthCertificate: null as File | null,
    interests: [] as string[],
  });

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
    } else {
      console.log('Submit:', formData);
    }
  };

  const interests = [
    'Art & Culture',
    'Technology',
    'Sports',
    'Music',
    'Education',
    'Health & Wellness',
    'Business',
    'Travel'
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        {step < 5 ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'h-2 flex-1 rounded-full',
                      s <= step ? 'bg-[#E91E63]' : 'bg-gray-200',
                      s !== 4 && 'mr-2'
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-gray-500">
                Step {step} of 4
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-semibold text-center mb-6">
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
                  <Button variant="google" fullWidth className="mt-4">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                         alt="Google" 
                         className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  <p className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-[#E91E63] hover:text-[#D81B60]">Login</Link>
                  </p>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-semibold text-center mb-6">
                    Personal Information
                  </h2>
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
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-semibold text-center mb-6">
                    Document Upload
                  </h2>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Please upload a copy of your birth certificate
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({ ...formData, birthCertificate: file });
                      }}
                      required
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="text-2xl font-semibold text-center mb-6">
                    Your Interests
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Select topics that interest you:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          'p-3 rounded-md text-sm font-medium transition-colors',
                          formData.interests.includes(interest)
                            ? 'bg-[#E91E63] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <Button type="submit" fullWidth>
                {step === 4 ? 'Complete Registration' : 'Next'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-[#E91E63]" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Registration Completed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account is being processed. Verification may take up to 24 hours.
            </p>
            <Link to="/login">
              <Button fullWidth>
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}