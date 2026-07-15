const resumeBtn = document.getElementById('resumeBtn');

if (resumeBtn) {
  resumeBtn.addEventListener('click', () => {
    window.open('resume.pdf', '_blank');
  });
}
