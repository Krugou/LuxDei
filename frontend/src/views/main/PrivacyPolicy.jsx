import React from 'react';
import PrivacySection from '../../components/main/PrivacySection';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-100  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy for JakFilms Festival Online Event</h1>
                <p className="mt-2 text-gray-600">
                    Welcome to JakFilms Festival, the premier online film festival experience! We take your privacy seriously and want you to feel confident in how we handle your personal information during this exciting online event.
                </p>

                <PrivacySection
                    title="Information We Collect"
                    content="At JakFilms Festival, we collect limited information necessary to enhance your online festival experience. This includes your name, email address, and optional survey responses to tailor the event to your preferences."
                />
                <PrivacySection
                    title="How We Use Your Information"
                    content="Your information is used solely to personalize your festival experience. We may send you festival updates, recommend films based on your preferences, and ensure smooth event access."
                />
                <PrivacySection
                    title="Disclosure of Your Information"
                    content="Rest assured, we never sell or share your personal information with third parties. Your data is strictly used to improve your JakFilms Festival experience."
                />
                <PrivacySection
                    title="Security"
                    content="We prioritize your data security. Our state-of-the-art encryption and security measures protect your information from unauthorized access. Enjoy the festival with peace of mind."
                />
                <PrivacySection
                    title="Changes to This Privacy Policy"
                    content="Our commitment to your privacy remains unwavering. If any changes to this policy are made, we will notify you promptly and provide the option to review and accept the updated terms."
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
