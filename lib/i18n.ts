"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "si" | "ta";

export interface Translations {
  // Navigation
  nav_overview: string;
  nav_bikes: string;
  nav_calculator: string;
  nav_parts: string;
  nav_offers: string;
  nav_about: string;
  nav_showroom: string;
  nav_inquire: string;
  nav_test_ride: string;
  nav_deals_badge: string;

  // Slogans & Branding
  brand_name: string;
  brand_subtitle: string;
  slogan_charge: string;
  tagline: string;
  showroom_address: string;
  phone_label: string;
  email_label: string;

  // Hero Section
  hero_eyebrow: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_title_3: string;
  hero_desc: string;
  hero_btn_explore: string;
  hero_btn_book: string;
  metric_electric: string;
  metric_emissions: string;
  metric_cost: string;

  // Technology & Why Electric
  why_eyebrow: string;
  why_title: string;
  benefit_range_title: string;
  benefit_range_desc: string;
  benefit_emissions_title: string;
  benefit_emissions_desc: string;
  benefit_design_title: string;
  benefit_design_desc: string;
  spec_title: string;
  spec_btn: string;
  spec_battery: string;
  spec_motor: string;
  spec_console: string;

  // Collection
  collection_title: string;
  collection_desc: string;
  collection_view_all: string;
  spec_motor_power: string;
  spec_top_speed: string;
  spec_range: string;
  spec_battery_cap: string;
  spec_charging_time: string;
  spec_brakes: string;

  // Calculator
  calc_title: string;
  calc_subtitle: string;
  calc_model_label: string;
  calc_price_label: string;
  calc_down_payment: string;
  calc_loan_amount: string;
  calc_tenure: string;
  calc_months: string;
  calc_interest_rate: string;
  calc_bank_benchmarks: string;
  calc_monthly_installment: string;
  calc_total_interest: string;
  calc_total_payable: string;
  calc_petrol_savings_title: string;
  calc_petrol_savings_desc: string;
  calc_daily_commute: string;
  calc_petrol_cost_month: string;
  calc_ev_cost_month: string;
  calc_net_savings_month: string;
  calc_whatsapp_cta: string;
  calc_disclaimer: string;

  // Spare Parts
  parts_title: string;
  parts_subtitle: string;
  parts_search_placeholder: string;
  parts_category_all: string;
  parts_category_batteries: string;
  parts_category_tires: string;
  parts_category_electronics: string;
  parts_category_accessories: string;
  parts_in_stock: string;
  parts_order_whatsapp: string;
  parts_genuine_guarantee: string;

  // Contact & Showroom
  contact_need_help: string;
  contact_sub: string;
  contact_call_us: string;
  contact_whatsapp_us: string;
  contact_visit_us: string;

  // Footer
  footer_desc: string;
  footer_quick_links: string;
  footer_models: string;
  footer_stay_informed: string;
  footer_newsletter_desc: string;
  footer_join_btn: string;
  footer_all_rights: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav_overview: "Overview",
    nav_bikes: "Bikes Fleet",
    nav_calculator: "EMI Calculator",
    nav_parts: "Spare Parts",
    nav_offers: "Offers",
    nav_about: "About",
    nav_showroom: "Showroom",
    nav_inquire: "Inquire",
    nav_test_ride: "Book Test Ride",
    nav_deals_badge: "Deals",

    brand_name: "UDAN ENTERPRISES",
    brand_subtitle: "Zuboo Electric Mobility",
    slogan_charge: "JOIN US & CHARGE YOUR RIDE ⚡",
    tagline: "A Cleaner Brighter Tomorrow",
    showroom_address: "Udugama Road, Kurunduwatta, Galle",
    phone_label: "078 496 9652",
    email_label: "Pibida17udan4131@gmail.com",

    hero_eyebrow: "ZUBOO ELECTRIC BIKES • UDAN ENTERPRISES",
    hero_title_1: "A CLEANER",
    hero_title_2: "BRIGHTER",
    hero_title_3: "TOMORROW",
    hero_desc:
      "Udan Enterprises presents Zuboo electric mobility — smarter, greener and engineered for silent, high-efficiency travel across Sri Lanka.",
    hero_btn_explore: "Explore Collection",
    hero_btn_book: "Book a Test Ride",
    metric_electric: "100% Electric Mobility",
    metric_emissions: "0% Carbon Emissions",
    metric_cost: "Low Running Cost",

    why_eyebrow: "WHY ZUBOO",
    why_title: "THINGS YOU WERE SEEKING FOR",
    benefit_range_title: "UP TO 110 KM PER CHARGE",
    benefit_range_desc: "Go further across Sri Lanka with advanced high-capacity lithium battery technology.",
    benefit_emissions_title: "ZERO EMISSIONS & SILENT",
    benefit_emissions_desc: "Enjoy clean air and pure silence with smooth torque output.",
    benefit_design_title: "MODERN AERODYNAMIC DESIGN",
    benefit_design_desc: "A perfect blend of European styling, comfort and durability on local roads.",
    spec_title: "ADVANCED SPECIFICATIONS BUILT FOR THE FUTURE",
    spec_btn: "View All Features",
    spec_battery: "REMOVABLE LITHIUM BATTERY",
    spec_motor: "HIGH TORQUE ELECTRIC MOTOR",
    spec_console: "SMART DIGITAL CONSOLE",

    collection_title: "ZUBOO COLLECTION",
    collection_desc: "Stylish, powerful and built for everyday adventures across Sri Lanka.",
    collection_view_all: "View All 8 Models",
    spec_motor_power: "Motor Power",
    spec_top_speed: "Top Speed",
    spec_range: "Range per Charge",
    spec_battery_cap: "Battery Capacity",
    spec_charging_time: "Charging Time",
    spec_brakes: "Brake System",

    calc_title: "Sri Lankan Rupee (LKR) Loan / EMI Calculator",
    calc_subtitle:
      "Plan your electric transition. Calculate monthly installments and discover how much you will save on petrol each month.",
    calc_model_label: "Select Zuboo Model",
    calc_price_label: "Vehicle Retail Price",
    calc_down_payment: "Down Payment",
    calc_loan_amount: "Financed Loan Amount",
    calc_tenure: "Financing Tenure",
    calc_months: "Months",
    calc_interest_rate: "Annual Interest Rate (%)",
    calc_bank_benchmarks: "Sri Lankan Bank Benchmarks",
    calc_monthly_installment: "Monthly Installment (EMI)",
    calc_total_interest: "Total Interest",
    calc_total_payable: "Total Payable",
    calc_petrol_savings_title: "Estimated Monthly Fuel Savings",
    calc_petrol_savings_desc:
      "Benchmarked against petrol at Rs 370/L. Your monthly fuel savings can pay for a large share of your EMI!",
    calc_daily_commute: "Daily Commute Distance",
    calc_petrol_cost_month: "Monthly Petrol Scooter Cost",
    calc_ev_cost_month: "Monthly Zuboo EV Charging Cost",
    calc_net_savings_month: "Net Monthly Savings",
    calc_whatsapp_cta: "Get Quotation via WhatsApp",
    calc_disclaimer:
      "* Installment amounts are indicative estimates. Actual rates and leasing terms depend on individual bank and leasing partner approval (Commercial Bank, HNB, Sampath, LOLC).",

    parts_title: "Genuine Zuboo Spare Parts & Accessories",
    parts_subtitle:
      "Keep your electric ride running at peak performance with factory-original Zuboo replacement parts and rider gear in Galle.",
    parts_search_placeholder: "Search spare parts, tires, chargers, batteries...",
    parts_category_all: "All Parts",
    parts_category_batteries: "Batteries & Chargers",
    parts_category_tires: "Tires & Brakes",
    parts_category_electronics: "Electronics & Smart Keys",
    parts_category_accessories: "Accessories & Gear",
    parts_in_stock: "In Stock at Galle Showroom",
    parts_order_whatsapp: "Order via WhatsApp",
    parts_genuine_guarantee: "100% Genuine Zuboo Certified Parts with Warranty",

    contact_need_help: "NEED ASSISTANCE OR MORE INFORMATION?",
    contact_sub: "Our support team in Galle is ready to assist you!",
    contact_call_us: "Call Hotline",
    contact_whatsapp_us: "WhatsApp Us",
    contact_visit_us: "Visit Galle Showroom",

    footer_desc:
      "Premium electric bicycle and motorcycle catalogue for Udan Enterprises. Showcasing the high-performance Zuboo collection in Sri Lanka.",
    footer_quick_links: "Quick Links",
    footer_models: "Zuboo Models",
    footer_stay_informed: "Stay Informed",
    footer_newsletter_desc:
      "Subscribe to receive verified retail price lists, arrival notifications, and test ride schedules.",
    footer_join_btn: "Join",
    footer_all_rights: "All rights reserved.",
  },

  si: {
    nav_overview: "මුල් පිටුව",
    nav_bikes: "යතුරුපැදි පෙළ",
    nav_calculator: "ණය ගණකය (EMI)",
    nav_parts: "අමතර කොටස්",
    nav_offers: "විශේෂ දීමනා",
    nav_about: "අප ගැන",
    nav_showroom: "ප්‍රදර්ශනාගාරය",
    nav_inquire: "විමසන්න",
    nav_test_ride: "ටෙස්ට් රයිඩ් එකක් ගන්න",
    nav_deals_badge: "දීමනා",

    brand_name: "උදාන් එන්ටර්ප්‍රයිසස්",
    brand_subtitle: "සුබූ විද්‍යුත් යතුරුපැදි",
    slogan_charge: "අප හා එක්වන්න, ඔබගේ ගමන ආරෝපණය කරන්න ⚡",
    tagline: "පිරිසිදු, දීප්තිමත් හෙටක් උදෙසා",
    showroom_address: "උඩුගම පාර, කුරුඳුවත්ත, ගාල්ල",
    phone_label: "078 496 9652",
    email_label: "Pibida17udan4131@gmail.com",

    hero_eyebrow: "සුබූ විද්‍යුත් යතුරුපැදි • උදාන් එන්ටර්ප්‍රයිසස්",
    hero_title_1: "පිරිසිදු",
    hero_title_2: "දීප්තිමත්",
    hero_title_3: "හෙටක් උදෙසා",
    hero_desc:
      "උදාන් එන්ටර්ප්‍රයිසස් වෙතින් සුබූ (Zuboo) විද්‍යුත් යතුරුපැදි — පරිසර හිතකාමී, වඩාත් බුද්ධිමත් සහ ශ්‍රී ලංකාවේ මාර්ග සඳහාම නිපදවන ලද නිහඬ ගමනක්.",
    hero_btn_explore: "යතුරුපැදි නරඹන්න",
    hero_btn_book: "ටෙස්ට් රයිඩ් වෙන්කරන්න",
    metric_electric: "100% විදුලි බලය",
    metric_emissions: "0% දුම් පිටවීම",
    metric_cost: "අඩු ධාවන වියදම",

    why_eyebrow: "සුබූ තෝරාගන්නේ ඇයි?",
    why_title: "ඔබ සොයන උසස්ම තාක්ෂණය",
    benefit_range_title: "තනි ආරෝපණයකින් කිලෝමීටර් 110 ක් දක්වා",
    benefit_range_desc: "උසස් ලිතියම් බැටරි තාක්ෂණය සමඟ ශ්‍රී ලංකාව පුරා දිගු දුරක් පහසුවෙන්ම යන්න.",
    benefit_emissions_title: "දුම් පිටවීමෙන් තොරයි, නිහඬයි",
    benefit_emissions_desc: "පිරිසිදු වාතාශ්‍රය සහ කිසිදු ශබ්දයකින් තොරව සුමට ධාවන අත්දැකීමක් ලබන්න.",
    benefit_design_title: "නවීන යුරෝපීය මෝස්තරය",
    benefit_design_desc: "විලාසිතාව, කල්පැවැත්ම සහ සුවපහසුව එක්තැන් වූ අද්විතීය නිර්මාණය.",
    spec_title: "අනාගතය උදෙසා නිර්මාණය කළ උසස් විශේෂාංග",
    spec_btn: "සියලු විශේෂාංග",
    spec_battery: "ඉවත් කළ හැකි ලිතියම් බැටරිය",
    spec_motor: "ප්‍රබල විදුලි මෝටරය",
    spec_console: "ස්මාර්ට් ඩිජිටල් මීටර පුවරුව",

    collection_title: "සුබූ යතුරුපැදි එකතුව",
    collection_desc: "ශ්‍රී ලංකාවේ දෛනික ගමන් බිමන් සඳහා විලාසිතාත්මක සහ ප්‍රබල යතුරුපැදි.",
    collection_view_all: "මාදිලි 8 ම නරඹන්න",
    spec_motor_power: "මෝටර් ධාරිතාව",
    spec_top_speed: "උපරිම වේගය",
    spec_range: "ධාවන දුර",
    spec_battery_cap: "බැටරි ධාරිතාව",
    spec_charging_time: "ආරෝපණ කාලය",
    spec_brakes: "තිරිංග පද්ධතිය",

    calc_title: "ශ්‍රී ලංකා රුපියල් (LKR) ලීසිං / ණය ගණකය",
    calc_subtitle:
      "ඔබේ මාසික වාරිකය ගණනය කර, පෙට්‍රල් සඳහා වැයවන මුදලින් මාසිකව කොපමණ මුදලක් ඉතිරි කරගත හැකිදැයි ක්ෂණිකව සොයාගන්න.",
    calc_model_label: "සුබූ මාදිලිය තෝරන්න",
    calc_price_label: "වාහනයේ මිල",
    calc_down_payment: "මූලික ගෙවීම (Down Payment)",
    calc_loan_amount: "ණය මුදල",
    calc_tenure: "ගෙවීමේ කාලසීමාව",
    calc_months: "මාස",
    calc_interest_rate: "වාර්ෂික පොලී අනුපාතය (%)",
    calc_bank_benchmarks: "දේශීය බැංකු පොලී අනුපාත",
    calc_monthly_installment: "ඇස්තමේන්තුගත මාසික වාරිකය (EMI)",
    calc_total_interest: "සම්පූර්ණ පොලිය",
    calc_total_payable: "මුළු ගෙවිය යුතු මුදල",
    calc_petrol_savings_title: "ඉන්ධන ඉතිරිකිරීමේ ඇස්තමේන්තුව",
    calc_petrol_savings_desc:
      "පෙට්‍රල් ලීටරයක මිල රු. 370 ක් ලෙස ගණන් බලා ඇත. ඉන්ධන වලින් ඉතිරිවන මුදලින්ම ඔබේ මාසික වාරිකයෙන් වැඩි කොටසක් ගෙවිය හැකිය!",
    calc_daily_commute: "දෛනික ධාවන දුර",
    calc_petrol_cost_month: "සාමාන්‍ය පෙට්‍රල් ස්කූටරයක මාසික වියදම",
    calc_ev_cost_month: "සුබූ විදුලි ආරෝපණ මාසික වියදම",
    calc_net_savings_month: "මාසික ශුද්ධ ඉතිරිය",
    calc_whatsapp_cta: "ලීසිං මිල ගණන් WhatsApp මඟින් ලබාගන්න",
    calc_disclaimer:
      "* ගණනය කර ඇති වාරික ඇස්තමේන්තු පමණි. නිශ්චිත අනුපාත සහ කොන්දේසි බැංකු සහ මූල්‍ය ආයතන මත රඳා පවතී (Commercial Bank, HNB, Sampath, LOLC).",

    parts_title: "සුබූ නියම අමතර කොටස් සහ උපාංග",
    parts_subtitle:
      "ඔබගේ විද්‍යුත් යතුරුපැදිය ඉහළම ක්‍රියාකාරීත්වයෙන් තබාගැනීම සඳහා ගාල්ල ප්‍රදර්ශනාගාරයෙන් සහතිකලත් නියම අමතර කොටස්.",
    parts_search_placeholder: "අමතර කොටස්, ටයර්, චාජර්, බැටරි සොයන්න...",
    parts_category_all: "සියලු කොටස්",
    parts_category_batteries: "බැටරි සහ චාජර්",
    parts_category_tires: "ටයර් සහ තිරිංග (Brakes)",
    parts_category_electronics: "ඉලෙක්ට්‍රොනික සහ ස්මාර්ට් කී",
    parts_category_accessories: "අමතර උපාංග සහ හෙල්මට්",
    parts_in_stock: "ගාල්ල ප්‍රදර්ශනාගාරයේ ඇත",
    parts_order_whatsapp: "WhatsApp මඟින් ඇණවුම් කරන්න",
    parts_genuine_guarantee: "වගකීමක් සහිත 100% ක් නියම සුබූ සහතිකලත් අමතර කොටස්",

    contact_need_help: "ඔබට වැඩි විස්තර හෝ සහාය අවශ්‍යද?",
    contact_sub: "ගාල්ලේ අපගේ පාරිභෝගික සේවා කණ්ඩායම ඔබට සහාය වීමට සූදානම්!",
    contact_call_us: "ක්ෂණික ඇමතුම්",
    contact_whatsapp_us: "WhatsApp පණිවිඩයක් එවන්න",
    contact_visit_us: "ගාල්ල ප්‍රදර්ශනාගාරයට පැමිණෙන්න",

    footer_desc:
      "උදාන් එන්ටර්ප්‍රයිසස් වෙතින් ශ්‍රී ලංකාවට හඳුන්වා දෙන සුබූ (Zuboo) උසස් තත්ත්වයේ විද්‍යුත් පාපැදි සහ යතුරුපැදි එකතුව.",
    footer_quick_links: "ප්‍රධාන සබැඳි",
    footer_models: "සුබූ මාදිලි",
    footer_stay_informed: "යාවත්කාලීනව සිටින්න",
    footer_newsletter_desc: "නවතම මිල ගණන් සහ ප්‍රවර්ධන තොරතුරු ලබාගැනීම සඳහා එක්වන්න.",
    footer_join_btn: "එක්වන්න",
    footer_all_rights: "සියලු හිමිකම් ඇවිරිණි.",
  },

  ta: {
    nav_overview: "முகப்பு",
    nav_bikes: "பைக் வகைகள்",
    nav_calculator: "கடன் கணிப்பான் (EMI)",
    nav_parts: "உதிரி பாகங்கள்",
    nav_offers: "சலுகைகள்",
    nav_about: "எங்களைப் பற்றி",
    nav_showroom: "காட்சி கூடம்",
    nav_inquire: "விசாரிக்க",
    nav_test_ride: "ஓட்டிப் பார்க்க",
    nav_deals_badge: "சலுகை",

    brand_name: "உடான் எண்டர்பிரைசஸ்",
    brand_subtitle: "சுபூ மின்சார வாகனங்கள்",
    slogan_charge: "எங்களுடன் இணையுங்கள் & உங்கள் பயணத்தை சார்ஜ் செய்யுங்கள் ⚡",
    tagline: "தூய்மையான பிரகாசமான எதிர்காலத்திற்கு",
    showroom_address: "உடுகம வீதி, குருந்துவத்த, காலி",
    phone_label: "078 496 9652",
    email_label: "Pibida17udan4131@gmail.com",

    hero_eyebrow: "சுபூ மின்சார பைக்குகள் • உடான் எண்டர்பிரைசஸ்",
    hero_title_1: "தூய்மையான",
    hero_title_2: "பிரகாசமான",
    hero_title_3: "நாளைய விடியல்",
    hero_desc:
      "உடான் எண்டர்பிரைசஸ் வழங்கும் சுபூ (Zuboo) மின்சார பைக்குகள் — நவீன, சுற்றுச்சூழலுக்கு உகந்த மற்றும் அமைதியான உயர் திறன் பயணம்.",
    hero_btn_explore: "பைக்குகளை பார்வையிடுங்கள்",
    hero_btn_book: "ஓட்டிப் பார்க்க பதிவு செய்யுங்கள்",
    metric_electric: "100% மின்சார இயக்கம்",
    metric_emissions: "0% காற்று மாசுபாடு",
    metric_cost: "குறைந்த பராமரிப்பு செலவு",

    why_eyebrow: "சுபூவை ஏன் தேர்வு செய்ய வேண்டும்?",
    why_title: "நீங்கள் தேடும் அதிநவீன தொழில்நுட்பம்",
    benefit_range_title: "ஒரு சார்ஜில் 110 கி.மீ வரை",
    benefit_range_desc: "மேம்பட்ட லித்தியம் பேட்டரி தொழில்நுட்பத்துடன் இலங்கை முழுவதும் நீண்ட தூரம் பயணிக்கலாம்.",
    benefit_emissions_title: "புகையற்ற, அமைதியான பயணம்",
    benefit_emissions_desc: "சுத்தமான காற்று மற்றும் சத்தமில்லாத மென்மையான பயண அனுபவத்தை அனுபவியுங்கள்.",
    benefit_design_title: "நவீன ஏரோடைனமிக் வடிவமைப்பு",
    benefit_design_desc: "ஐரோப்பிய வடிவமைப்பு, சௌகரியம் மற்றும் நீடித்த உழைப்பின் சரியான கலவை.",
    spec_title: "எதிர்காலத்திற்காக உருவாக்கப்பட்ட அதிநவீன அம்சங்கள்",
    spec_btn: "அனைத்து அம்சங்களையும் பார்க்க",
    spec_battery: "கழற்றக்கூடிய லித்தியம் பேட்டரி",
    spec_motor: "உயர் செயல்திறன் மின் மோட்டார்",
    spec_console: "ஸ்மார்ட் டிஜிட்டல் மீட்டர்",

    collection_title: "சுபூ பைக் தொகுப்பு",
    collection_desc: "இலங்கையின் அன்றாட பயணங்களுக்கான ஸ்டைலான, சக்திவாய்ந்த மின்சார பைக்குகள்.",
    collection_view_all: "அனைத்து 8 மாடல்களையும் காண்க",
    spec_motor_power: "மோட்டார் திறன்",
    spec_top_speed: "அதிவேகம்",
    spec_range: "பயண தூரம்",
    spec_battery_cap: "பேட்டரி அளவு",
    spec_charging_time: "சார்ஜ் ஆகும் நேரம்",
    spec_brakes: "பிரேக் அமைப்பு",

    calc_title: "இலங்கை ரூபாய் (LKR) லீசிங் / EMI கடன் கணிப்பான்",
    calc_subtitle:
      "உங்கள் மாதாந்திர தவணையை கணக்கிடுங்கள் மற்றும் பெட்ரோல் செலவில் ஒவ்வொரு மாதமும் எவ்வளவு சேமிக்கலாம் என்பதைக் கண்டறியுங்கள்.",
    calc_model_label: "சுபூ மாடலை தேர்வு செய்க",
    calc_price_label: "வாகனத்தின் விலை",
    calc_down_payment: "முன்பணம் (Down Payment)",
    calc_loan_amount: "கடன் தொகை",
    calc_tenure: "திருப்பிச் செலுத்தும் காலம்",
    calc_months: "மாதங்கள்",
    calc_interest_rate: "ஆண்டு வட்டி விகிதம் (%)",
    calc_bank_benchmarks: "இலங்கை வங்கிகளின் வட்டி விகிதங்கள்",
    calc_monthly_installment: "மதிப்பிடப்பட்ட மாதாந்திர தவணை (EMI)",
    calc_total_interest: "மொத்த வட்டி",
    calc_total_payable: "மொத்தம் செலுத்த வேண்டிய தொகை",
    calc_petrol_savings_title: "மதிப்பிடப்பட்ட மாதாந்திர பெட்ரோல் சேமிப்பு",
    calc_petrol_savings_desc:
      "பெட்ரோல் லிட்டருக்கு ரூ. 370 அடிப்படையில் கணக்கிடப்பட்டது. பெட்ரோல் சேமிப்பே உங்கள் மாதாந்திர தவணையின் பெரும் பகுதியை ஈடுகட்டும்!",
    calc_daily_commute: "தினசரி பயண தூரம்",
    calc_petrol_cost_month: "வழக்கமான பெட்ரோல் ஸ்கூட்டர் செலவு",
    calc_ev_cost_month: "சுபூ மின்சார சார்ஜிங் செலவு",
    calc_net_savings_month: "நிகர மாதாந்திர சேமிப்பு",
    calc_whatsapp_cta: "WhatsApp மூலம் விலைப் பட்டியலை பெறவும்",
    calc_disclaimer:
      "* கணக்கிடப்பட்ட தவணைகள் தோராயமானவை. துல்லியமான வட்டி விகிதம் மற்றும் விதிமுறைகள் வங்கிகளைப் பொறுத்தது (Commercial Bank, HNB, Sampath, LOLC).",

    parts_title: "சுபூ ஒரிஜினல் உதிரி பாகங்கள் & உபகரணங்கள்",
    parts_subtitle:
      "உங்கள் மின்சார பைக்கை சிறந்த முறையில் பராமரிக்க காலியில் உள்ள ஒரிஜினல் சுபூ மாற்று பாகங்கள் மற்றும் பாதுகாப்பு உபகரணங்கள்.",
    parts_search_placeholder: "உதிரி பாகங்கள், டயர்கள், சார்ஜர்கள், பேட்டரிகள் தேடவும்...",
    parts_category_all: "அனைத்து பாகங்களும்",
    parts_category_batteries: "பேட்டரிகள் & சார்ஜர்கள்",
    parts_category_tires: "டயர்கள் & பிரேக் பாகங்கள்",
    parts_category_electronics: "எலக்ட்ரானிக்ஸ் & ஸ்மார்ட் சாவிகள்",
    parts_category_accessories: "ஹெல்மெட்கள் & கூடுதல் பாகங்கள்",
    parts_in_stock: "காலி ஷோரூமில் கையிருப்பில் உள்ளது",
    parts_order_whatsapp: "WhatsApp மூலம் ஆர்டர் செய்ய",
    parts_genuine_guarantee: "உத்தரவாதத்துடன் கூடிய 100% சான்றளிக்கப்பட்ட சுபூ ஒரிஜினல் பாகங்கள்",

    contact_need_help: "உதவி அல்லது கூடுதல் தகவல் தேவையா?",
    contact_sub: "காலியில் உள்ள எங்கள் வாடிக்கையாளர் சேவை குழு உங்களுக்கு உதவ தயாராக உள்ளது!",
    contact_call_us: "தொலைபேசி அழைப்பு",
    contact_whatsapp_us: "WhatsApp மூலம் தொடர்பு கொள்ள",
    contact_visit_us: "காலி ஷோரூமுக்கு வருகை தருக",

    footer_desc:
      "உடான் எண்டர்பிரைசஸ் வழங்கும் சுபூ (Zuboo) பிரீமியம் மின்சார மிதிவண்டிகள் மற்றும் மோட்டார் சைக்கிள்கள்.",
    footer_quick_links: "விரைவு இணைப்புகள்",
    footer_models: "சுபூ மாடல்கள்",
    footer_stay_informed: "இணைந்திருங்கள்",
    footer_newsletter_desc: "விலைப்பட்டியல் மற்றும் புதிய அறிவிப்புகளைப் பெற பதிவு செய்யவும்.",
    footer_join_btn: "இணையுங்கள்",
    footer_all_rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("udan_lang") as Language;
    if (saved && (saved === "en" || saved === "si" || saved === "ta")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("udan_lang", lang);
      document.documentElement.lang = lang;
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    {
      value: {
        language,
        setLanguage,
        t: translations[language],
      },
    },
    children
  );
};

export const useTranslation = () => useContext(LanguageContext);
