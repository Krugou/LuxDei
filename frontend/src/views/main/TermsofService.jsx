import React from 'react';
import TextSection from '../../components/main/TextSection';

const TermsOfService = () => {
    return (
        <div className="bg-gray-100  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
                <p className="mt-2 text-gray-600">
                    Welcome to JakFilms Movie Festival. By using our website, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <TextSection
                    title="1. Acceptance of Terms"
                    content="By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service."
                />
                <TextSection
                    title="2. Use of the Website"
                    content="You may use our website for your personal and non-commercial use. You agree not to use the website for any unlawful purpose."
                />
                <TextSection
                    title="3. Privacy Policy"
                    content="Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy for more information."
                />
                <TextSection
                    title="4. Changes to Terms"
                    content="We reserve the right to modify or replace these Terms of Service at any time without prior notice. Please review these terms regularly."
                />
                <TextSection
                    title="5. Contact Information"
                    content="If you have any questions about these Terms of Service, please contact us at info@jakfilms.com."
                />

                {/* Add more sections as needed */}
            </div>
        </div>
    );
};

export default TermsOfService;
