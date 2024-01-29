import { Log } from '../types/logTypes'

type LogTableProps = {
  logs: Log[]
}

function LogTable({ logs }: LogTableProps) {
  const timeZone = 'America/Los_Angeles'

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-2">
          <th className="text-left">Date</th>
          <th className="text-left">Time</th>
          <th className="text-left">Current appointment</th>
          <th className="text-left">Better appointment found</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, idx) => {
          return (
            <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-200' : ''}>
              <td className="py-2">{log.date.toDateString()}</td>
              <td className="py-2">
                {log.date.toLocaleTimeString('en-US', {
                  timeZoneName: 'short',
                  timeZone,
                })}
              </td>
              <td className="py-2">
                {log.currentAppointment.toLocaleDateString('en-US', { timeZone })}
              </td>
              <td className="py-2">
                {log.bestAppointmentFound === null
                  ? 'N/A'
                  : log.bestAppointmentFound.toDateString()}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default LogTable
