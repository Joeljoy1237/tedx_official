import TitleBar from "@components/TitleBar";
import Link from "next/link";
import React from "react";

export default function Content() {
  return (
    <div className="pt-[100px] px-[5vw] flex flex-col gap-5 pb-8">
      <TitleBar title="Privacy" titleSecond="Policy" />
      <span className="">
        <b>TEDxCCET</b>&nbsp; ("us", "we", or "our") operates{" "}
        <Link className="" href={"https://tedxccet.in/"}>
          {" "}
          https://tedxccet.in/ ""
        </Link>{" "}
        (the "Site"). This page informs you of our policies regarding the
        collection, use, and disclosure of Personal Information we receive from
        users of the Site. We use your Personal Information only for providing
        and improving the Site. By using the Site, you agree to the collection
        and use of information in accordance with this policy.
      </span>
      <span className="text-xl font-semibold">
        Information Collection and Use
      </span>
      While using our Site, we may ask you to provide us with certain personally
      identifiable information that can be used to contact or identify you.
      Personally identifiable information may include, but is not limited to
      your name ("Personal Information").
      <span className="text-xl font-semibold">Log Data</span>
      Like many site operators, we collect information that your browser sends
      whenever you visit our Site ("Log Data"). This Log Data may include
      information such as your computer's Internet Protocol ("IP") address,
      browser type, browser version, the pages of our Site that you visit, the
      time and date of your visit, the time spent on those pages, and other
      statistics. In addition, we may use third-party services such as Google
      Analytics that collect, monitor, and analyze this data.
      <span className="text-xl font-semibold">Communications</span>
      We may use your Personal Information to contact you with newsletters,
      marketing or promotional materials, and other information.
      <span className="text-xl font-semibold">Cookies</span>
      Cookies are files with a small amount of data, which may include an
      anonymous unique identifier. Cookies are sent to your browser from a
      website and stored on your computer's hard drive. Like many sites, we use
      "cookies" to collect information. You can instruct your browser to refuse
      all cookies or to indicate when a cookie is being sent. However, if you do
      not accept cookies, you may not be able to use some portions of our Site.
      <span className="text-xl font-semibold">Security</span>
      Security of your Personal Information is important to us, but remember
      that no method of transmission over the Internet, or method of electronic
      storage, is 100% secure. While we strive to use commercially acceptable
      means to protect your Personal Information, we cannot guarantee its
      absolute security.
      <span className="text-xl font-semibold">
        Changes to This Privacy Policy
      </span>
      This Privacy Policy is effective as of 7th August 2024 and will remain in
      effect except with respect to any changes in its provisions in the future,
      which will be in effect immediately after being posted on this page. We
      reserve the right to update or change our Privacy Policy at any time and
      you should check this Privacy Policy periodically. Your continued use of
      the Site after we post any modifications to the Privacy Policy on this
      page will constitute your acknowledgment of the modifications and your
      consent to abide and be bound by the modified Privacy Policy. If we make
      any material changes to this Privacy Policy, we will notify you either
      through the email address you have provided us or by placing a prominent
      notice on our website.
      <span className="text-xl font-semibold">Contact Us</span>
      <span className="">
        If you have any questions about these Terms, please contact us at
        <Link
          href="mailto:tedxsupport@carmelcet.in"
          className="text-primary-700 font-semibold"
        >
          {" "}
          tedxsupport@carmelcet.in
        </Link>
      </span>
    </div>
  );
}
