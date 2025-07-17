import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 80px 0px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 12px;
  font-size: 18px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 12px;
  font-size: 18px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(225deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  padding: 13px 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border: none;
`;

const Contact = () => {
  const form = useRef();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    emailjs
      .sendForm(
        "service_sxmrh6d", // ✅ Your Service ID
        "template_q0mb5fi", // ✅ Your Template ID
        form.current,
        "FPSqqBdgz_pONt7pI" // ✅ Your Public Key
      )
      .then(
        () => {
          setOpenSuccess(true);
          form.current.reset();
          setLoading(false);
        },
        () => {
          setOpenFail(true);
          setLoading(false);
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput name="name" placeholder="Your Name" required />
          <ContactInput name="email" type="email" placeholder="Your Email" required />
          <ContactInput name="title" placeholder="Subject" required />
          <ContactInputMessage name="message" placeholder="Message" required />
          <ContactButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </ContactButton>
        </ContactForm>

        {/* Success Snackbar */}
        <Snackbar
          open={openSuccess}
          autoHideDuration={4000}
          onClose={() => setOpenSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
            <p style={{ color: "green", marginTop: "10px", fontWeight: "600" }}></p>
            Email sent successfully!
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={openFail}
          autoHideDuration={4000}
          onClose={() => setOpenFail(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenFail(false)} severity="error" sx={{ width: "100%" }}>
            Failed to send email. Please try again later.
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
