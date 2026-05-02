import { motion } from 'framer-motion'
import { ExternalLink, UserPlus, FileText, Upload, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    title: "Visit Official Portal",
    desc: "Go to the Election Commission's official portal (voters.eci.gov.in) and create an account using your mobile number.",
    icon: ExternalLink,
    color: "bg-indigo-600 text-white",
  },
  {
    title: "Select Form 6",
    desc: "Choose 'Form 6' which is specifically for the registration of new voters applying for the first time.",
    icon: FileText,
    color: "bg-pink-600 text-white",
  },
  {
    title: "Fill Details",
    desc: "Enter your personal details, family details, and current address accurately as per your official documents.",
    icon: UserPlus,
    color: "bg-cyan-500 text-slate-200",
  },
  {
    title: "Upload Documents",
    desc: "Upload a recent passport-size photograph, proof of age (e.g., Birth Certificate, PAN), and proof of address (e.g., Aadhaar).",
    icon: Upload,
    color: "bg-white/5 backdrop-blur-md text-slate-200",
  },
  {
    title: "Submit & Track",
    desc: "Submit the form and save the Reference ID generated to track your application status online.",
    icon: CheckCircle2,
    color: "bg-gray-200 text-slate-200",
  }
]

const VoterRegistration = () => {
  return (
    <section id="register" className="py-24 bg-cyan-500 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Header Area */}
          <div className="w-full md:w-1/3">
            <div className="bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10 inline-block mb-6 shadow-premium transform -rotate-2">
              <span className="font-black uppercase tracking-widest text-xl">Get Your Voter ID</span>
            </div>
            <h2 className="brutal-heading-lg text-slate-200 mb-6">
              FIRST TIME VOTER?
            </h2>
            <p className="text-2xl font-bold border-l-8 border-white/10 pl-4 mb-8">
              Registering to vote is your constitutional right. The process is completely online, fast, and free.
            </p>
            <a 
              href="https://voters.eci.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="brutal-btn-primary w-full flex items-center justify-center gap-3 text-2xl py-6 group"
            >
              Apply Now 
              <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <p className="mt-4 font-bold text-sm uppercase opacity-80">
              * Redirects to official ECI Voters' Service Portal
            </p>
          </div>

          {/* Steps Area */}
          <div className="w-full md:w-2/3">
            <div className="brutal-card bg-white/5 backdrop-blur-md p-8 md:p-12">
              <h3 className="text-3xl font-black uppercase mb-8 border-b-4 border-white/10 pb-4">
                5 Simple Steps
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      key={index} 
                      className={`p-6 border border-white/10 shadow-premium ${step.color}`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 border border-white/10 bg-white/5 backdrop-blur-md text-slate-200 flex items-center justify-center font-black text-xl rounded-full flex-shrink-0">
                          {index + 1}
                        </div>
                        <Icon size={32} />
                      </div>
                      <h4 className="font-black text-2xl uppercase mb-2 leading-tight">{step.title}</h4>
                      <p className="font-bold text-lg opacity-90">{step.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default VoterRegistration
