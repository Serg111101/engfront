import React from "react";
import "./Info.scss";
import { useSelector } from "react-redux";

export function Info() {
  const { Contact } = useSelector((state) => state.Contact);
  console.log(Contact);
  return (
    <div className="Info">
      <div className="info_container">
        {Contact?.map((el, index) => (
          <div key={index} className="conta">
            {el?.link ? (
              <a href={el?.link} target="_black">
                <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                <p>{el?.text}</p>
              </a>
            ) : index === 1 ? (
              <a href={"tel:" + el?.text}>
                <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                <p>{el?.text}</p>
              </a>
            ) : (
              <>
                <a
                  aria-haspopup="false"
                  data-ux="Link"
                  data-aid="CONTACT_INFO_EMAIL_REND"
                  href={"mailto:"+ el?.text}
                  data-typography="LinkAlpha"
                  className="x-el x-el-a c1-1j c1-1k c1-1l c1-1m c1-1a c1-1n c1-1o c1-b c1-1v c1-c c1-1w c1-1x c1-1y c1-d c1-e c1-f c1-g"
                  data-tccl="ux2.CONTACT.contact7.Content.Default.Link.Default.30534.click,click"
                >
                  <img src={el?.logo} alt={el?.title} />
                  <p>{el?.title}</p>
                  <p>{el?.text}</p>
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
