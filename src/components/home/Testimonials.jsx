import { BookUserIcon, Heart } from 'lucide-react'
import React from 'react'
import Title from './Title';


const Testimonials = () => {

    const testimonials = [
        { text: "PrebuiltUI helped us move faster without sacrificing design quality. The components feel production-ready.", name: "Cristofer Levin", role: "Frontend engineer", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" },
        { text: "The attention to detail in PrebuiltUI is impressive. Saved me hours of repetitive work and time. Highly recommended.", name: "Rohan Mehta", role: "Startup founder", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" },
        { text: "We were able ship faster using PrebuiltUI. The consistency across components made UI feel polished.", name: "Jason Kim", role: "Product designer", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60" },
        { text: "PrebuiltUI feels like it was built by people who actually ship products. Components are clean and easy to use.", name: "Alex Turner", role: "Full stack developer", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60" },
        { text: "PrebuiltUI helped us maintain design consistency across multiple projects. It's now a core part of design.", name: "Sofia Martinez", role: "UX designer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop" },
        { text: "Our team productivity improved noticeably after adopting PrebuiltUI. It reduced design handoff friction.", name: "Daniel Wong", role: "UI designer", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png" }
    ];

    const rows = [
        { start: 0, end: 3, className: "animate-scroll" },
        { start: 3, end: 6, className: "animate-scroll-reverse" }
    ];

    const renderCard = (testimonial, index) => (
        <div key={index} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-[350px]">
            <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-[#737373]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                ))}
            </div>
            <p className="text-neutral-700 text-sm mb-6">{testimonial.text}</p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover" />
                <div className='inline-flex gap-2'>
                    <p className="font-medium text-neutral-800 text-sm">{testimonial.name}</p>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.6943 0.900204C5.51166 1.05585 5.42033 1.13369 5.3228 1.19906C5.09922 1.34891 4.84813 1.45291 4.58408 1.50504C4.46888 1.52779 4.34927 1.53733 4.11006 1.55642C3.50903 1.60439 3.2085 1.62836 2.95778 1.71692C2.37788 1.92175 1.92175 2.37788 1.71692 2.95778C1.62836 3.2085 1.60439 3.50903 1.55642 4.11006C1.53733 4.34927 1.52779 4.46888 1.50504 4.58408C1.45291 4.84813 1.34891 5.09922 1.19906 5.3228C1.13369 5.42033 1.05586 5.51165 0.900204 5.6943C0.509124 6.15323 0.313577 6.38265 0.198917 6.62258C-0.0663056 7.1775 -0.0663056 7.8225 0.198917 8.37743C0.313584 8.61735 0.509124 8.84678 0.900204 9.3057C1.05584 9.48833 1.13369 9.57968 1.19906 9.67718C1.34891 9.90075 1.45291 10.1519 1.50504 10.4159C1.52779 10.5311 1.53733 10.6508 1.55642 10.8899C1.60439 11.491 1.62836 11.7915 1.71692 12.0422C1.92175 12.6221 2.37788 13.0783 2.95778 13.2831C3.2085 13.3716 3.50903 13.3956 4.11006 13.4436C4.34927 13.4627 4.46888 13.4722 4.58408 13.495C4.84813 13.5471 5.09922 13.6511 5.3228 13.801C5.42033 13.8663 5.51165 13.9441 5.6943 14.0998C6.15323 14.4909 6.38265 14.6864 6.62258 14.8011C7.1775 15.0663 7.8225 15.0663 8.37743 14.8011C8.61735 14.6864 8.84678 14.4909 9.3057 14.0998C9.48833 13.9441 9.57968 13.8663 9.67718 13.801C9.90075 13.6511 10.1519 13.5471 10.4159 13.495C10.5311 13.4722 10.6508 13.4627 10.8899 13.4436C11.491 13.3956 11.7915 13.3716 12.0422 13.2831C12.6221 13.0783 13.0783 12.6221 13.2831 12.0422C13.3716 11.7915 13.3956 11.491 13.4436 10.8899C13.4627 10.6508 13.4722 10.5311 13.495 10.4159C13.5471 10.1519 13.6511 9.90075 13.801 9.67718C13.8663 9.57968 13.9441 9.48833 14.0998 9.3057C14.4909 8.84678 14.6864 8.61735 14.8011 8.37743C15.0663 7.8225 15.0663 7.1775 14.8011 6.62258C14.6864 6.38265 14.4909 6.15323 14.0998 5.6943C13.9441 5.51165 13.8663 5.42033 13.801 5.3228C13.6511 5.09922 13.5471 4.84813 13.495 4.58408C13.4722 4.46888 13.4627 4.34927 13.4436 4.11006C13.3956 3.50903 13.3716 3.2085 13.2831 2.95778C13.0783 2.37788 12.6221 1.92175 12.0422 1.71692C11.7915 1.62836 11.491 1.60439 10.8899 1.55642C10.6508 1.53733 10.5311 1.52779 10.4159 1.50504C10.1519 1.45291 9.90075 1.34891 9.67718 1.19906C9.57968 1.13369 9.48833 1.05586 9.3057 0.900204C8.84678 0.509124 8.61735 0.313584 8.37743 0.198917C7.8225 -0.0663056 7.1775 -0.0663056 6.62258 0.198917C6.38265 0.313577 6.15323 0.509124 5.6943 0.900204ZM10.7801 5.89736C11.0185 5.65898 11.0185 5.2725 10.7801 5.03412C10.5418 4.79575 10.1552 4.79575 9.91688 5.03412L6.27923 8.6718L5.0831 7.4757C4.84472 7.23735 4.45824 7.23735 4.21987 7.4757C3.9815 7.71405 3.9815 8.10053 4.21987 8.33895L5.84759 9.96668C6.08595 10.205 6.47243 10.205 6.71085 9.96668L10.7801 5.89736Z" fill="#2196F3" />
                    </svg>
                </div>
            </div>
        </div>
    );


    return (
        <>
            <div id='testimonials' className='flex flex-col items-center my-10 scroll-mt-12'>
                {/* ======== Badge ======== */}
                <div className="flex items-center gap-2 text-sm text-green-600 bg-blue-400/10  rounded-full px-4 py-1">
                    <BookUserIcon className="size-4.5 stroke-green-600" />
                    <span>Testimonials</span>
                </div>
                {/* ======================= */}
                <Title title={"Don't just take our word for it"}
                    desc='Hear what our users say about us. We are always looking 
             for ways to improve. if you have a 
             positive experience with us, leave a review!' />
            </div>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollReverse {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 15s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scrollReverse 15s linear infinite;
                    }
                `}
            </style>
            <section className="bg-[#FAFAFA] py-16 px-4">
                <div className="max-w-6xl mx-auto">


                    <div className="space-y-6">
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                                <div className={`flex gap-6 ${row.className}`}>
                                    {[...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end)].map((testimonial, index) =>
                                        renderCard(testimonial, index)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )

}

export default Testimonials
