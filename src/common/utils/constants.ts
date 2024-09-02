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
        url: "/our-theme"
    },
    {
        title: "Our Speakers",
        url: "/our-speakers"
    },
    {
        title: "get tickets",
        url: "/get-tickets"
    },
    {
        title: "getting there",
        url: "/getting-there"
    },
]

export const socials = [
    { icon: FaFacebookF, link: "https://www.facebook.com/people/TEDx-CCET/61563436965963/" },
    { icon: FaLinkedinIn, link: "https://linkedin.com/in/tedxccet/" },
    { icon: RiInstagramFill, link: "https://instagram.com/tedxccet" },
];

const tabs = [
    { id: 1, label: "Ted", content: "Content about Ted." },
    { id: 2, label: "Tedx", content: "Content about Tedx." },
    { id: 3, label: "Tedxccet", content: "Content about Tedxccet." },
];

export const aboutDetails = [
    {
        id: 1,
        title: "TED",
        desc: `"By spreading ideas worthy enough to be shared, the power of inspiration and change is created”. A global community striving towards spreading ideas from every discipline and culture, that is TED in a nutshell. It is a non-profit organisation that helps people get the deeper meaning of ideas, attitudes and the world itself. From its origin in 1984, TED talks have touched people’s hearts. It is continued to be watched all around the world. The impact a TED event creates is unmatched. TED conferences and events inspire and motivate people towards becoming a better version of themselves`
    },
    {
        id: 2,
        title: "TEDx",
        desc: "TEDx events are independently organized and licensed TED-like events organized by enthusiastic communities and organizers in line with TED’s mission ‘ideas worth spreading’. Its goal is to create a unique gathering in the community that will unleash new ideas, inspire and inform. It provides a platform where ideas are shared openly and connections are made through conversation. The event screens TED Talks videos and invites live speakers to drive ideation and start conversations. TEDx has reached a milestone of 100,000 talks and are now viewed more than 3 billion times annually."
    },
    {
        id: 3,
        title: "TEDxCCET",
        desc: "The first-ever TEDxCCET at Carmel College of Engineering & Technology (CCET) is something we are quite excited about! Our dedication to encouraging creativity, inspiration and insightful conversation is demonstrated by this event. CCET is pleased to welcome the TEDx platform to our campus as a forward-thinking organization committed to academic excellence. TEDxCCET will bring together intellectuals and thought leaders. Join us on this journey of exploration, discovery and inspiration at TEDxCCET. Together, let’s embrace the power of ideas to ignite change and transform lives."
    }
]

export const speakersList = [
    // {
    //     name:"Dr. Divya S Iyer IAS",
    //     designation:"MD, Vizhinjam International Seaport ",
    //     image:"/speakers/divya.png",
    // },
    {
        name: "Dr. V P Gangadharan",
        designation: "Oncologist",
        image: "/speakers/gangadharandr.png",
    },
    {
        name: "Ms. Alakananda R",
        designation: "News Reader & Journalist",
        image: "/speakers/alakananda.png",
    },
    {
        name: "Mr. Joy Sebastian",
        designation: "CEO, Techgentsia",
        image: "/speakers/joy.png",
    },
    {
        name: "Mr. Job Kurian",
        designation: "Singer & Composer",
        image: "/speakers/jobkurian.png",
    },
    {
        name: "Mr. Akhil P Dharmajan",
        designation: "Writer",
        image: "/speakers/akhilp.png",
    },
    {
        name: "Mr. Nikhil Kilivayil",
        designation: "CEO, Brototype",
        image: "/speakers/nikhil.png",
    },
    {
        name: "Master Raul Aju John",
        designation: "Tech Enthusiast",
        image: "/speakers/rault.png",
    }
]

export const sponsors = {
    titleSponsors: [
        {
            name: "Al-muqtadir jewllers",
            imgUrl: "/sponsors/al-muqtadir.png"
        },
        {
            name: "Federal bank",
            imgUrl: "/sponsors/federalbanklogo.png"
        },
    ],
    coSponsors: [
        {
            name: "Lic HFL",
            imgUrl: "/sponsors/lichfl.png"
        },
        {
            name: "obcydians",
            imgUrl: "/sponsors/obcydians.png"
        },
        {
            name: "almiya",
            imgUrl: "/sponsors/almiya.jpg"
        },
        {
            name: "audiomatrix",
            imgUrl: "/sponsors/audiomatrix.jpg"
        },
    ]
}