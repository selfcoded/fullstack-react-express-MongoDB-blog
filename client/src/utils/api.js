import { useNavigate } from "react-router-dom";

export const useSubmitContactFormData = () => {
  const navigate = useNavigate();
  const submitContactFormData = async (e, isEmpty, formData) => {
    e.preventDefault();
    if (Object.values(isEmpty).indexOf(true) !== -1) return;
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: formData.email,
          subject: formData.subject,
          text: formData.message,
          html: `<!DOCTYPE html>
            <html lang="en">
              <body>
                <div class="contact-html-container">
                  <div class="upper">
                    <h3>${formData.subject}</h3>
                  </div>
                  <div class="middle">
                    <p>to ${formData.email}</p>
                  </div>
                  <div class="lower">
                    <p><span>message:</span>${formData.message}</p>
                  </div>
                  <footer>
                    <p>this email is automatisch generated, pls dont reply</p>
                  </footer>
                </div>
              </body>
            </html>`,
        }),
      });
      const data = await res.json();

      alert(data.message);
      if (res.ok) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { submitContactFormData };
};
