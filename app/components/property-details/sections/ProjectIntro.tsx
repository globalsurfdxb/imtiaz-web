"use client";
import { SectionDescription } from "../../animations/SectionDescription";
import { SectionHeading } from "../../animations/SectionHeading";
// import { introData } from "../data";
import { useGsapStagger } from "../../../hooks/useGsapStagger";

import CustomIconButton from "../../common/CustomIconButton";
import { useEffect, useRef, useState } from "react";
import EnquiryForm from "@/app/components/auth/EnquiryForm";
import gsap from "gsap";


// type PdfDoc = (typeof pdfdocData)[0];

interface ProjectIntroProps {
  title: string,
  description: string,
  brochure: string,
  fact_sheet: string,
  unit_layout: string
  hide_button_brochure: string;
  hide_button_factsheet: string;
  hide_button_unitlayout: string;
}

function ProjectIntro({ title, description, brochure, fact_sheet, unit_layout, hide_button_brochure, hide_button_factsheet, hide_button_unitlayout }: ProjectIntroProps) {
  const [enquiryVisible, setEnquiryVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const pendingDownload = useRef<{ url: string; fileName: string } | null>(null);

  const pdfdocData = [
    {
      id: "brochure",
      image: brochure ?? "",
      label: "Brochure",
      hidden: hide_button_brochure == "true"
    },
    {
      id: "factsheet",
      image: fact_sheet ?? "",
      label: "Fact Sheet",
      hidden: hide_button_factsheet == "true"
    },
    {
      id: "unitlayout",
      image: unit_layout ?? "",
      label: "Floor Plan",
      hidden: hide_button_unitlayout == "true"
    },
  ];

  const gridRef = useGsapStagger({
    selector: ".selector",
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    stagger: 0.15,
    start: "top 80%",
  });

  const getFileName = (path: string, label: string) => {
    const fileName = path?.split('/').pop() || label.toLowerCase();
    return fileName;
  };

const openModal = (url: string, fileName: string) => {
  if (!url || url.trim() === "") return;
  pendingDownload.current = { url, fileName };
  setEnquiryVisible(true);
};

  // Animate in after visible
  useEffect(() => {
    if (!enquiryVisible) return;
    setTimeout(() => {
      if (!backdropRef.current || !modalRef.current) return;
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 1.08, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }
      );
    }, 50);
  }, [enquiryVisible]);

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) return;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, {
      opacity: 0, scale: 1.06, filter: "blur(16px)", duration: 0.5, ease: "power3.out",
      onComplete: () => setEnquiryVisible(false),
    });
  };

const handleSuccess = async () => {
  closeModal();
  if (!pendingDownload.current) return;
  const { url, fileName } = pendingDownload.current;
  pendingDownload.current = null;

  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank");
  }
};

  return (
    <section
      data-header="dark"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(97, 18, 13, 0.95) 0%, rgba(73, 9, 5, 0.95) 100%)",
      }}
      className="w-full py-[70px] lg:py-120 3xl:py-130"
    >
      <div className="container flex flex-col items-center">
        {title && <SectionHeading
          title={title}
          as="h1"
          className="text-white mb-20 text-center max-w-[35ch]"
        />}
        {description && <SectionDescription
          text={description}
          className="text-white/80  max-w-[95ch] text-center whitespace-pre-line"
        />}
        <div
          className=" flex  flex-wrap gap-20 md:gap-[15px] justify-center items-center mt-[50px] w-full"
          ref={gridRef}
        >

          {pdfdocData.map((doc, index) =>
            doc.hidden ? null : (
              <div
                key={index}
                className="selector justify-center"
                onClick={() => openModal(doc.image, getFileName(doc.image, doc.label))}
              >
                <CustomIconButton
                  icondownload={true}
                  className="icnpojectbtn w-full md:w-[210px] !px-5 xl:!px-[30px] 2xl:!px-[5px] 2xl:!py-[20.5px] h-[44px] md:h-[50px] xl:h-[66px]"
                  text={doc.label}
                  borderColor="border-white"
                  textColor="text-white"
                  variant="light"
                />
              </div>
            )
          )}
        </div>
      </div>
      {/* Enquiry Modal */}
      {enquiryVisible && (
        <>
          <div ref={backdropRef} className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[6px] opacity-0" onClick={closeModal} />
          <div ref={modalRef} className="fixed inset-0 z-[1001] flex items-center justify-center opacity-0 pointer-events-none">
            <div className="pointer-events-auto w-full">
              <EnquiryForm onClose={closeModal} onSwitch={() => {}} onSuccess={handleSuccess} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProjectIntro;