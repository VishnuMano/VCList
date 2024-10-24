document.addEventListener('DOMContentLoaded', () => {
    const internships = [
        { company: "Sequoia Capital", position: "VC Intern", location: "San Francisco, CA" },
        { company: "Andreessen Horowitz", position: "Summer VC Analyst", location: "Menlo Park, CA" },
        { company: "Lightspeed Venture Partners", position: "Investment Intern", location: "New York, NY" },
        // Add more internships as needed
    ];

    const internshipList = document.getElementById('internship-list');

    internships.forEach(internship => {
        const card = document.createElement('div');
        card.classList.add('internship-card');
        card.innerHTML = `
            <h2>${internship.company}</h2>
            <p>${internship.position}</p>
            <p>${internship.location}</p>
        `;
        internshipList.appendChild(card);
    });
});
