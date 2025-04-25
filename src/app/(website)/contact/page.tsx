import React from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="bg-black text-white">
      <div className="bg-gradient-to-b from-zinc-900 to-black">
        <div className="pt-32 px-6 container mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/5">
              <div className="flex items-center mb-8">
                <div className="w-10 h-px bg-[#cd0d0f] mr-3"></div>
                <span className="text-sm uppercase tracking-wider">CONTACT</span>
              </div>
            </div>

            <div className="md:w-4/5">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Connect with our <span className="text-gray-500">expert team to transform your vehicle and elevate your presence on the road.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="pl-6 ml-[20%] grid grid-cols-1 md:grid-cols-2  gap-12 mb-10 ">
          {/* Email */}
          <div className="">
            <div className="flex items-start">
              <Mail className="mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-400">wrapndrivelimited@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="">
            <div className="flex items-start">
              <Phone className="mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-gray-400">+254 792 391 610</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="">
            <div className="flex items-start mb-4">
              <Clock className="mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                <p className="text-gray-400">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-start mb-6">
              <MapPin className="mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                <p className="text-gray-400 leading-relaxed">
                  Northern Bypass, opposite QuickMart Thome,<br />
                  Gachie, Nairobi Area,<br />
                  Kenya, 00200
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="container mx-auto px-6 border-gray-800 pt-12">
          <div className="md:w-full h-96 bg-gray-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9256836890104!2d36.872113800000015!3d-1.2120109000000034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f262c510ee9%3A0x357e14f327e4ab1d!2sQuick%20Mart%20Thome!5e0!3m2!1sen!2ske!4v1745603631837!5m2!1sen!2ske"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
