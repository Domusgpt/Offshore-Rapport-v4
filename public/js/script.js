document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Fetch resume data from the server
  fetchResumeData();
});

async function fetchResumeData() {
  try {
    const response = await fetch('/api/resume');
    const data = await response.json();
    
    // Update the resume with the fetched data
    updateResumeContent(data);
  } catch (error) {
    console.error('Error fetching resume data:', error);
  }
}

function updateResumeContent(data) {
  // Update personal information
  if (data.personal) {
    if (data.personal.name) document.getElementById('name').textContent = data.personal.name;
    if (data.personal.title) document.getElementById('title').textContent = data.personal.title;
    
    const contactElements = {
      email: document.getElementById('email'),
      phone: document.getElementById('phone'),
      location: document.getElementById('location'),
      website: document.getElementById('website')
    };
    
    // Update contact information
    for (const [key, element] of Object.entries(contactElements)) {
      if (data.personal[key]) {
        element.querySelector('span').textContent = data.personal[key];
      } else {
        element.style.display = 'none';
      }
    }
    
    // Update about text
    if (data.personal.about) {
      document.getElementById('about-text').textContent = data.personal.about;
    }
    
    // Update profile image
    if (data.personal.profileImage) {
      document.getElementById('profile-img').src = data.personal.profileImage;
    }
  }
  
  // Update experience section
  if (data.experience && data.experience.length > 0) {
    const experienceContainer = document.getElementById('experience-container');
    experienceContainer.innerHTML = '';
    
    data.experience.forEach(exp => {
      const expElement = createExperienceElement(exp);
      experienceContainer.appendChild(expElement);
    });
  }
  
  // Update education section
  if (data.education && data.education.length > 0) {
    const educationContainer = document.getElementById('education-container');
    educationContainer.innerHTML = '';
    
    data.education.forEach(edu => {
      const eduElement = createEducationElement(edu);
      educationContainer.appendChild(eduElement);
    });
  }
  
  // Update skills section
  if (data.skills && data.skills.length > 0) {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    data.skills.forEach(skill => {
      const skillElement = createSkillElement(skill);
      skillsContainer.appendChild(skillElement);
    });
  }
  
  // Update projects section
  if (data.projects && data.projects.length > 0) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    data.projects.forEach(project => {
      const projectElement = createProjectElement(project);
      projectsContainer.appendChild(projectElement);
    });
  }
}

function createExperienceElement(exp) {
  const expElement = document.createElement('div');
  expElement.className = 'experience-item';
  
  expElement.innerHTML = `
    <div class="item-header">
      <h3 class="item-title">${exp.position}</h3>
      <span class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</span>
    </div>
    <div class="item-subtitle">${exp.company}, ${exp.location}</div>
    <p class="item-description">${exp.description}</p>
  `;
  
  return expElement;
}

function createEducationElement(edu) {
  const eduElement = document.createElement('div');
  eduElement.className = 'education-item';
  
  eduElement.innerHTML = `
    <div class="item-header">
      <h3 class="item-title">${edu.degree}</h3>
      <span class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</span>
    </div>
    <div class="item-subtitle">${edu.institution}, ${edu.location}</div>
    <p class="item-description">${edu.description || ''}</p>
  `;
  
  return eduElement;
}

function createSkillElement(skill) {
  const skillElement = document.createElement('div');
  skillElement.className = 'skill-item';
  
  // Add icon based on skill category (if available)
  let iconClass = 'fas fa-check';
  
  if (skill.category) {
    const categoryIcons = {
      'programming': 'fas fa-code',
      'design': 'fas fa-paint-brush',
      'languages': 'fas fa-language',
      'tools': 'fas fa-tools',
      'soft': 'fas fa-user-friends'
    };
    
    iconClass = categoryIcons[skill.category.toLowerCase()] || iconClass;
  }
  
  skillElement.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${skill.name}</span>
  `;
  
  return skillElement;
}

function createProjectElement(project) {
  const projectElement = document.createElement('div');
  projectElement.className = 'project-item';
  
  // Create tech tags HTML
  let techTagsHtml = '';
  if (project.technologies && project.technologies.length > 0) {
    techTagsHtml = project.technologies.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');
  }
  
  projectElement.innerHTML = `
    <img src="${project.image || '/images/project-placeholder.jpg'}" alt="${project.title}" class="project-img">
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-technologies">
        ${techTagsHtml}
      </div>
    </div>
  `;
  
  return projectElement;
}