document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize form with resume data
  fetchResumeData();
  
  // Add event listeners for dynamic form elements
  document.getElementById('add-experience').addEventListener('click', addExperienceField);
  document.getElementById('add-education').addEventListener('click', addEducationField);
  document.getElementById('add-skill').addEventListener('click', addSkillField);
  document.getElementById('add-project').addEventListener('click', addProjectField);
  
  // Handle profile image upload
  document.getElementById('profile-img').addEventListener('change', handleImageUpload);
  
  // Handle form submission
  document.getElementById('resume-form').addEventListener('submit', handleFormSubmit);
});

async function fetchResumeData() {
  try {
    const response = await fetch('/api/resume');
    const data = await response.json();
    
    // Populate the form with the fetched data
    populateForm(data);
  } catch (error) {
    console.error('Error fetching resume data:', error);
  }
}

function populateForm(data) {
  // Populate personal information
  if (data.personal) {
    for (const [key, value] of Object.entries(data.personal)) {
      const element = document.getElementById(key);
      if (element && key !== 'profileImage') {
        element.value = value;
      }
    }
    
    // Show profile image if exists
    if (data.personal.profileImage) {
      const previewElement = document.getElementById('profile-preview');
      previewElement.innerHTML = `<img src="${data.personal.profileImage}" alt="Profile preview">`;
    }
  }
  
  // Populate experience fields
  if (data.experience && data.experience.length > 0) {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';
    
    data.experience.forEach(exp => {
      addExperienceField(null, exp);
    });
  }
  
  // Populate education fields
  if (data.education && data.education.length > 0) {
    const container = document.getElementById('education-container');
    container.innerHTML = '';
    
    data.education.forEach(edu => {
      addEducationField(null, edu);
    });
  }
  
  // Populate skill fields
  if (data.skills && data.skills.length > 0) {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    data.skills.forEach(skill => {
      addSkillField(null, skill);
    });
  }
  
  // Populate project fields
  if (data.projects && data.projects.length > 0) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    data.projects.forEach(project => {
      addProjectField(null, project);
    });
  }
}

function addExperienceField(event, data = null) {
  const container = document.getElementById('experience-container');
  const index = container.children.length;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'dynamic-form-group';
  
  fieldGroup.innerHTML = `
    <button type="button" class="remove-button" onclick="removeFormGroup(this)"><i class="fas fa-times"></i></button>
    
    <div class="form-group">
      <label for="exp-title-${index}">Position/Title</label>
      <input type="text" id="exp-title-${index}" name="experience[${index}][position]" value="${data?.position || ''}" required>
    </div>
    
    <div class="form-group">
      <label for="exp-company-${index}">Company/Organization</label>
      <input type="text" id="exp-company-${index}" name="experience[${index}][company]" value="${data?.company || ''}" required>
    </div>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="exp-location-${index}">Location</label>
        <input type="text" id="exp-location-${index}" name="experience[${index}][location]" value="${data?.location || ''}">
      </div>
      
      <div class="form-group">
        <label for="exp-employment-type-${index}">Employment Type</label>
        <select id="exp-employment-type-${index}" name="experience[${index}][employmentType]">
          <option value="Full-time" ${data?.employmentType === 'Full-time' ? 'selected' : ''}>Full-time</option>
          <option value="Part-time" ${data?.employmentType === 'Part-time' ? 'selected' : ''}>Part-time</option>
          <option value="Contract" ${data?.employmentType === 'Contract' ? 'selected' : ''}>Contract</option>
          <option value="Internship" ${data?.employmentType === 'Internship' ? 'selected' : ''}>Internship</option>
          <option value="Freelance" ${data?.employmentType === 'Freelance' ? 'selected' : ''}>Freelance</option>
        </select>
      </div>
    </div>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="exp-start-date-${index}">Start Date</label>
        <input type="text" id="exp-start-date-${index}" name="experience[${index}][startDate]" value="${data?.startDate || ''}" placeholder="e.g., Jan 2020" required>
      </div>
      
      <div class="form-group">
        <label for="exp-end-date-${index}">End Date</label>
        <input type="text" id="exp-end-date-${index}" name="experience[${index}][endDate]" value="${data?.endDate || ''}" placeholder="e.g., Present">
      </div>
    </div>
    
    <div class="form-group">
      <label for="exp-description-${index}">Description</label>
      <textarea id="exp-description-${index}" name="experience[${index}][description]" rows="4">${data?.description || ''}</textarea>
    </div>
  `;
  
  container.appendChild(fieldGroup);
}

function addEducationField(event, data = null) {
  const container = document.getElementById('education-container');
  const index = container.children.length;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'dynamic-form-group';
  
  fieldGroup.innerHTML = `
    <button type="button" class="remove-button" onclick="removeFormGroup(this)"><i class="fas fa-times"></i></button>
    
    <div class="form-group">
      <label for="edu-degree-${index}">Degree/Certificate</label>
      <input type="text" id="edu-degree-${index}" name="education[${index}][degree]" value="${data?.degree || ''}" required>
    </div>
    
    <div class="form-group">
      <label for="edu-institution-${index}">Institution</label>
      <input type="text" id="edu-institution-${index}" name="education[${index}][institution]" value="${data?.institution || ''}" required>
    </div>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="edu-location-${index}">Location</label>
        <input type="text" id="edu-location-${index}" name="education[${index}][location]" value="${data?.location || ''}">
      </div>
      
      <div class="form-group">
        <label for="edu-field-${index}">Field of Study</label>
        <input type="text" id="edu-field-${index}" name="education[${index}][fieldOfStudy]" value="${data?.fieldOfStudy || ''}">
      </div>
    </div>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="edu-start-date-${index}">Start Date</label>
        <input type="text" id="edu-start-date-${index}" name="education[${index}][startDate]" value="${data?.startDate || ''}" placeholder="e.g., Sep 2018" required>
      </div>
      
      <div class="form-group">
        <label for="edu-end-date-${index}">End Date</label>
        <input type="text" id="edu-end-date-${index}" name="education[${index}][endDate]" value="${data?.endDate || ''}" placeholder="e.g., May 2022">
      </div>
    </div>
    
    <div class="form-group">
      <label for="edu-description-${index}">Description</label>
      <textarea id="edu-description-${index}" name="education[${index}][description]" rows="4">${data?.description || ''}</textarea>
    </div>
  `;
  
  container.appendChild(fieldGroup);
}

function addSkillField(event, data = null) {
  const container = document.getElementById('skills-container');
  const index = container.children.length;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'dynamic-form-group';
  
  fieldGroup.innerHTML = `
    <button type="button" class="remove-button" onclick="removeFormGroup(this)"><i class="fas fa-times"></i></button>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="skill-name-${index}">Skill Name</label>
        <input type="text" id="skill-name-${index}" name="skills[${index}][name]" value="${data?.name || ''}" required>
      </div>
      
      <div class="form-group">
        <label for="skill-category-${index}">Category</label>
        <select id="skill-category-${index}" name="skills[${index}][category]">
          <option value="">Select category</option>
          <option value="Programming" ${data?.category === 'Programming' ? 'selected' : ''}>Programming</option>
          <option value="Design" ${data?.category === 'Design' ? 'selected' : ''}>Design</option>
          <option value="Languages" ${data?.category === 'Languages' ? 'selected' : ''}>Languages</option>
          <option value="Tools" ${data?.category === 'Tools' ? 'selected' : ''}>Tools</option>
          <option value="Soft" ${data?.category === 'Soft' ? 'selected' : ''}>Soft Skills</option>
        </select>
      </div>
    </div>
    
    <div class="form-group">
      <label for="skill-level-${index}">Proficiency Level</label>
      <select id="skill-level-${index}" name="skills[${index}][level]">
        <option value="Beginner" ${data?.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
        <option value="Intermediate" ${data?.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
        <option value="Advanced" ${data?.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
        <option value="Expert" ${data?.level === 'Expert' ? 'selected' : ''}>Expert</option>
      </select>
    </div>
  `;
  
  container.appendChild(fieldGroup);
}

function addProjectField(event, data = null) {
  const container = document.getElementById('projects-container');
  const index = container.children.length;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'dynamic-form-group';
  
  // Parse technologies if they exist
  let techValue = '';
  if (data && data.technologies) {
    techValue = Array.isArray(data.technologies) ? data.technologies.join(', ') : data.technologies;
  }
  
  fieldGroup.innerHTML = `
    <button type="button" class="remove-button" onclick="removeFormGroup(this)"><i class="fas fa-times"></i></button>
    
    <div class="form-group">
      <label for="project-title-${index}">Project Title</label>
      <input type="text" id="project-title-${index}" name="projects[${index}][title]" value="${data?.title || ''}" required>
    </div>
    
    <div class="form-group">
      <label for="project-description-${index}">Description</label>
      <textarea id="project-description-${index}" name="projects[${index}][description]" rows="3">${data?.description || ''}</textarea>
    </div>
    
    <div class="form-group">
      <label for="project-technologies-${index}">Technologies Used</label>
      <input type="text" id="project-technologies-${index}" name="projects[${index}][technologies]" value="${techValue}" placeholder="e.g., HTML, CSS, JavaScript">
      <small>Separate technologies with commas</small>
    </div>
    
    <div class="dynamic-form-row">
      <div class="form-group">
        <label for="project-url-${index}">Project URL</label>
        <input type="url" id="project-url-${index}" name="projects[${index}][url]" value="${data?.url || ''}">
      </div>
      
      <div class="form-group">
        <label for="project-image-${index}">Project Image</label>
        <input type="file" id="project-image-${index}" data-index="${index}" class="project-image-upload" accept="image/*">
        <input type="hidden" id="project-image-path-${index}" name="projects[${index}][image]" value="${data?.image || ''}">
      </div>
    </div>
    
    <div class="project-image-preview" id="project-image-preview-${index}">
      ${data?.image ? `<img src="${data.image}" alt="Project image preview">` : ''}
    </div>
  `;
  
  container.appendChild(fieldGroup);
  
  // Add event listener for project image upload
  const imageUpload = fieldGroup.querySelector('.project-image-upload');
  imageUpload.addEventListener('change', handleProjectImageUpload);
}

// Function to remove a dynamic form group
window.removeFormGroup = function(button) {
  const formGroup = button.closest('.dynamic-form-group');
  formGroup.remove();
};

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const previewElement = document.getElementById('profile-preview');
  
  // Show loading indicator
  previewElement.innerHTML = '<div>Uploading...</div>';
  
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show the uploaded image
      previewElement.innerHTML = `<img src="${result.filePath}" alt="Profile preview">`;
      
      // Store the image path to be saved with the form
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'personal.profileImage';
      hiddenInput.value = result.filePath;
      hiddenInput.id = 'profile-image-path';
      
      // Replace existing hidden input if it exists
      const existingInput = document.getElementById('profile-image-path');
      if (existingInput) {
        existingInput.value = result.filePath;
      } else {
        // If it doesn't exist, append it to the form
        document.getElementById('resume-form').appendChild(hiddenInput);
      }
    } else {
      previewElement.innerHTML = `<div>Upload failed: ${result.message}</div>`;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    previewElement.innerHTML = '<div>Upload failed. Please try again.</div>';
  }
}

async function handleProjectImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const index = event.target.getAttribute('data-index');
  const previewElement = document.getElementById(`project-image-preview-${index}`);
  const hiddenInput = document.getElementById(`project-image-path-${index}`);
  
  // Show loading indicator
  previewElement.innerHTML = '<div>Uploading...</div>';
  
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show the uploaded image
      previewElement.innerHTML = `<img src="${result.filePath}" alt="Project image preview">`;
      
      // Store the image path in the hidden input
      hiddenInput.value = result.filePath;
    } else {
      previewElement.innerHTML = `<div>Upload failed: ${result.message}</div>`;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    previewElement.innerHTML = '<div>Upload failed. Please try again.</div>';
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Convert FormData to a structured object
  const resumeData = {
    personal: {
      name: formData.get('name'),
      title: formData.get('title'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      website: formData.get('website'),
      about: formData.get('about')
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  };
  
  // Add profile image if it exists
  const profileImagePath = document.getElementById('profile-image-path');
  if (profileImagePath) {
    resumeData.personal.profileImage = profileImagePath.value;
  }
  
  // Process experience fields
  const experienceElements = document.querySelectorAll('#experience-container .dynamic-form-group');
  experienceElements.forEach((element, index) => {
    const experience = {
      position: formData.get(`experience[${index}][position]`),
      company: formData.get(`experience[${index}][company]`),
      location: formData.get(`experience[${index}][location]`),
      employmentType: formData.get(`experience[${index}][employmentType]`),
      startDate: formData.get(`experience[${index}][startDate]`),
      endDate: formData.get(`experience[${index}][endDate]`),
      description: formData.get(`experience[${index}][description]`)
    };
    
    resumeData.experience.push(experience);
  });
  
  // Process education fields
  const educationElements = document.querySelectorAll('#education-container .dynamic-form-group');
  educationElements.forEach((element, index) => {
    const education = {
      degree: formData.get(`education[${index}][degree]`),
      institution: formData.get(`education[${index}][institution]`),
      location: formData.get(`education[${index}][location]`),
      fieldOfStudy: formData.get(`education[${index}][fieldOfStudy]`),
      startDate: formData.get(`education[${index}][startDate]`),
      endDate: formData.get(`education[${index}][endDate]`),
      description: formData.get(`education[${index}][description]`)
    };
    
    resumeData.education.push(education);
  });
  
  // Process skills fields
  const skillElements = document.querySelectorAll('#skills-container .dynamic-form-group');
  skillElements.forEach((element, index) => {
    const skill = {
      name: formData.get(`skills[${index}][name]`),
      category: formData.get(`skills[${index}][category]`),
      level: formData.get(`skills[${index}][level]`)
    };
    
    resumeData.skills.push(skill);
  });
  
  // Process projects fields
  const projectElements = document.querySelectorAll('#projects-container .dynamic-form-group');
  projectElements.forEach((element, index) => {
    const technologies = formData.get(`projects[${index}][technologies]`);
    const techArray = technologies ? technologies.split(',').map(tech => tech.trim()) : [];
    
    const project = {
      title: formData.get(`projects[${index}][title]`),
      description: formData.get(`projects[${index}][description]`),
      technologies: techArray,
      url: formData.get(`projects[${index}][url]`),
      image: formData.get(`projects[${index}][image]`)
    };
    
    resumeData.projects.push(project);
  });
  
  try {
    // Send the data to the server
    const response = await fetch('/api/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Resume updated successfully!');
    } else {
      alert(`Failed to update resume: ${result.message}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while saving your resume. Please try again.');
  }
}