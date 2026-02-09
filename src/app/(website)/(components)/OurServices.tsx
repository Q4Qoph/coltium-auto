const OurServices = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row mb-10">
          <div className="md:w-1/5">
            <div className="flex items-center mb-6">
              <div className="w-10 h-px bg-[var(--primary)] mr-3"></div>
              <span className="text-sm uppercase tracking-wider text-gray-300">
                Core Service
              </span>
            </div>
          </div>
          <div className="md:w-4/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Independent Vehicle Diagnostic Oversight
            </h2>
            <p className="text-gray-300 max-w-2xl">
              This is the single core service Coltium-Auto provides. Every engagement starts with
              comprehensive system diagnostics, expert interpretation of fault codes and live data,
              root-cause analysis, severity ranking, and clear technical guidance on what should —
              and should not — be done next.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 text-sm text-gray-200">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
            <h3 className="font-semibold mb-2">On-Demand Diagnostic Assessment</h3>
            <p className="text-gray-400 mb-3">
              For vehicles showing warning lights, performance issues, or abnormal behaviour.
            </p>
            <ul className="space-y-1">
              <li>• Full multi-ECU diagnostic scan</li>
              <li>• Live data evaluation</li>
              <li>• Fault prioritisation (critical / monitor / informational)</li>
              <li>• Root-cause hypothesis &amp; recommendations</li>
            </ul>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
            <h3 className="font-semibold mb-2">Preventive Vehicle Health Check</h3>
            <p className="text-gray-400 mb-3">
              For vehicles with no visible problems that still require proactive oversight.
            </p>
            <ul className="space-y-1">
              <li>• System health assessment</li>
              <li>• Early fault detection</li>
              <li>• Risk and wear indicators</li>
              <li>• Preventive guidance</li>
            </ul>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/40">
            <h3 className="font-semibold mb-2">Second-Opinion Diagnostic Review</h3>
            <p className="text-gray-400 mb-3">
              For customers who already have a garage quote or repair recommendation.
            </p>
            <ul className="space-y-1">
              <li>• Independent re-diagnosis</li>
              <li>• Validation or rejection of proposed repairs</li>
              <li>• Identification of misdiagnosis or over-repair</li>
              <li>• Technical justification you can share</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;