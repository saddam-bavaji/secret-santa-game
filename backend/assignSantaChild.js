function assignSantaChild(employees) {
  const emails = employees.map(e => e.Employee_EmailID);

  employees.forEach(emp => {
    const forbidden = new Set([
      emp.Employee_EmailID,           // cannot assign self
      emp.Prev_Santa_Child_EmailID   // cannot repeat previous assignment
    ]);

    // Allowed list = all except forbidden
    const allowedEmails = emails.filter(email => !forbidden.has(email));

    if (allowedEmails.length === 0) {
      emp.Santa_Child_Email = "No valid assignment";
      return;
    }

    // Pick random item
    const randomEmail = allowedEmails[Math.floor(Math.random() * allowedEmails.length)];

    emp.Santa_Child_Email = randomEmail;
  });

  return employees;
}
module.exports = assignSantaChild;