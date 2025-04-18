export default function DynamicFormSection({ role, formData, setFormData }) {
    const SKILLS = ['Solidity', 'React', 'Design', 'Marketing'];
    
    return role === 'freelancer' ? (
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Primary Skills</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  skills: [...new Set([...(formData.skills || []), skill])]
                })}
                className={`px-3 py-1 rounded-full ${
                  formData.skills?.includes(skill) 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100'
                }`}
              >
                {skill}
              </button>
            ))};
          </div>
        </div>
  
        <select
          value={formData.expertise || ''}
          onChange={(e) => setFormData({...formData, expertise: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Experience Level</option>
          <option value="junior">Junior (0-2 years)</option>
          <option value="mid">Mid-Level (2-5 years)</option>
          <option value="senior">Senior (5+ years)</option>
        </select>
      </div>
    ) : (
      <input
        placeholder="Company Name"
        value={formData.company || ''}
        onChange={(e) => setFormData({...formData, company: e.target.value})}
        className="w-full p-2 border rounded"
      />
    );
  }