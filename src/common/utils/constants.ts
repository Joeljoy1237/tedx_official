import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { title } from "process";

export const navLinks = [
    {
        title: "home",
        url: "/"
    },
    {
        title: "about",
        url: "/about"
    },
    {
        title: "theme",
        url: "/theme"
    },
    {
        title: "speakers",
        url: "/speakers"
    },
    {
        title: "sponsors",
        url: "/sponsors"
    },
    {
        title: "getting there",
        url: "/getting-there"
    },
]

export const socials = [
    { icon: FaFacebookF, link: "https://facebook.com" },
    { icon: FaLinkedinIn, link: "https://linkedin.com" },
    { icon: RiInstagramFill, link: "https://instagram.com" },
];

export const aboutDetails = [
    {
        title: "TED",
        desc: `"By spreading ideas worthy enough to be shared, the power of inspiration and change is created”. A global community striving towards spreading ideas from every discipline and culture, that is TED in a nutshell. It is a non-profit media organisation that helps people get the deeper meaning of ideas, attitudes, and the world itself. From its origin in 1984, TED talks have touched people’s hearts. It is continued to be watched all around the world. The impact a TED event creates is unmatched. TED conferences and events inspire and motivate people towards becoming a better version of themselves`
    },
    {
        title: "TEDx",
        desc: "TEDx events are independently organized, and licensed TED-like events organized by enthusiastic communities and organizers in line with TED’s mission ‘ideas worth spreading’. Its goal is to create a unique gathering in the community that will unleash new ideas, inspire, and inform. It provides a platform where ideas are shared openly, and connections are made through conversation. The event screens TED Talks videos and invites live speakers to drive ideation and start conversations. TEDx has reached a milestone of 100,000 talks and are now viewed more than 3 billion times annually."
    },
    {
        title: "TEDxCCET",
        desc: "The first-ever TEDxCCET at Carmel College of Engineering & Technology (CCET) is something we are quite excited about! Our dedication to encouraging creativity, inspiration, and insightful conversation is demonstrated by this event. CCET is pleased to welcome the TEDx platform to our campus as a forward-thinking organization committed to academic excellence. TEDxCCET will bring together intellectuals and thought leaders. Join us on this journey of exploration, discovery, and inspiration at TEDxCCET. Together, let’s embrace the power of ideas to ignite change and transform lives."
    }
]