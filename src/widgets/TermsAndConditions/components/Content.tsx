import TitleBar from "@components/TitleBar";
import Link from "next/link";
import React from "react";

export default function Content() {
  return (
    <div className="pt-[100px] px-[5vw] flex flex-col gap-5 pb-8">
      <TitleBar title="Terms and " titleSecond="Conditions" />
      <span className="">
        Welcome to{" "}
        <Link
          href={"https://tedxccet.in/"}
          className="text-primary-700 font-semibold"
        >
          {" "}https://tedxccet.in/
        </Link>{" "}
        operated by TEDxCCET ("we", "us", or "our"). By accessing or using our
        Site, you agree to comply with and be bound by the following terms and
        conditions ("Terms"). Please read these Terms carefully before using our
        Site. If you do not agree with any part of these Terms, you must not
        access or use the Site.
      </span>
      <span className="text-xl font-semibold">Acceptance of Terms</span>
      Your access to and use of the Site is conditioned upon your acceptance of
      and compliance with these Terms. These Terms apply to all visitors, users,
      and others who access or use the Site.
      <span className="text-xl font-semibold">Purchases</span>
      When you make a purchase on our Site, you may be required to provide
      certain information relevant to your purchase, including but not limited
      to your name, email address, phone number, and payment details. You
      warrant that the information you provide is accurate and complete.
      <span className="text-xl font-semibold">Subscriptions</span>
      Certain services offered on our Site may be available on a subscription
      basis. By subscribing, you agree to pay the subscription fees in advance
      on a recurring basis, according to the subscription plan selected.
      <span className="text-xl font-semibold">User Content</span>
      Our Site allows users to post, link, store, share, and otherwise make
      available various forms of content, including text, graphics, videos, and
      other materials ("Content"). You are solely responsible for the Content
      you post, ensuring it is lawful and does not infringe on any third-party
      rights.
      <span className="text-xl font-semibold">External Links</span>
      Our Site may contain links to third-party websites or services that are
      not owned or controlled by TEDxCCET. We do not have control over, and
      assume no responsibility for, the content, privacy policies, or practices
      of any third-party websites or services. You acknowledge and agree that
      TEDxCCET will not be responsible or liable for any damage or loss caused
      by or in connection with the use of or reliance on any such content,
      goods, or services available on or through any such websites or services.
      Modifications to Terms We reserve the right to modify or replace these
      Terms at any time at our sole discretion. If we make material changes to
      these Terms, we will provide notice by posting the new terms on the Site.
      It is your responsibility to review these Terms periodically for any
      changes. Your continued use of the Site following the posting of any
      changes constitutes acceptance of those changes.
      <span className="text-xl font-semibold">Contact Information</span>
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
