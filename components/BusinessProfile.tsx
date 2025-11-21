import React, { useState, useEffect } from 'react';

const businessTypes = [
    { name: 'Cafe' },
    { name: 'Retail' },
    { name: 'Clinic' },
    { name: 'Salon' },
    { name: 'Restaurant' },
    { name: 'Other' },
];

interface BusinessProfileProps {
    businessName: string;
    businessType: string;
    onUpdate: (data: { name: string; type: string }) => void;
}

const BusinessProfile: React.FC<BusinessProfileProps> = ({ businessName, businessType, onUpdate }) => {
    const [name, setName] = useState(businessName);
    const [type, setType] = useState(businessType);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setName(businessName);
        setType(businessType);
    }, [businessName, businessType]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ name, type });
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setName(businessName);
        setType(businessType);
    };

    return (
        <section id="business-profile" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-50">Business Profile</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {successMessage && <div className="mt-4 text-green-400 bg-green-900/50 p-3 rounded-lg animate-fade-in">{successMessage}</div>}

                {!isEditing ? (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                        <div>
                            <span className="text-slate-400">Business Name: </span>
                            <span className="text-slate-50 font-semibold">{name}</span>
                        </div>
                        <div>
                            <span className="text-slate-400">Industry: </span>
                            <span className="text-slate-50 font-semibold">{type}</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="mt-6 space-y-6 animate-fade-in">
                        <div>
                            <label htmlFor="profile-business-name" className="block text-sm font-medium text-slate-300">Business Name</label>
                            <input
                                id="profile-business-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 border rounded-lg focus:ring-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="profile-business-type" className="block text-sm font-medium text-slate-300">Industry</label>
                            <select 
                                id="profile-business-type" 
                                value={type} 
                                onChange={e => setType(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-3 text-base focus:outline-none sm:text-sm rounded-md"
                            >
                                {businessTypes.map(bt => <option key={bt.name} value={bt.name}>{bt.name}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-6 py-2 hover:bg-indigo-700 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="text-slate-300 hover:text-white font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default BusinessProfile;