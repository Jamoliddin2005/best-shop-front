import React from "react";

export default function Map() {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d224.34040385644835!2d69.61051610777072!3d40.84218039828234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2s!4v1660395060024!5m2!1suz!2s"
        width={"100%"}
        height={"500px"}
        frameBorder="0"
        title={"Map"}
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      />
    </div>
  );
}
