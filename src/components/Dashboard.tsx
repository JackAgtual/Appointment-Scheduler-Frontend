import { useState, useEffect } from 'react'
import { ApiService } from '../services/apiService'
import { Log } from '../types/logTypes'
import LogTable from './LogTable'

type DashboardProps = {
  email: string
  password: string
}

function Dashboard({ email, password }: DashboardProps) {
  const [logs, setLogs] = useState<Log[]>([])
  const [lastQueryTime, setLastQueryTime] = useState<string | null>(null)

  async function fetchLogs() {
    const res = await ApiService.getLogs({ email, password })
    setLogs(
      res.data.map((log: any) => {
        const bestAppointmentFound =
          'bestAppointmentFound' in log ? new Date(log.bestAppointmentFound) : null

        return {
          email: log.email,
          date: new Date(log.date),
          currentAppointment: new Date(log.currentAppointment),
          bestAppointmentFound,
        }
      }),
    )
  }

  async function fetchLastQueryTime() {
    const res = await ApiService.getLastQueryTime({ email, password })
    const lastQueryTime: string = res.data.time
    setLastQueryTime(lastQueryTime)
  }

  useEffect(() => {
    try {
      fetchLogs()
      fetchLastQueryTime()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div>
      {lastQueryTime !== null && (
        <p>We last checked for an appointment at {new Date(lastQueryTime).toString()}</p>
      )}

      {logs.length === 0 ? (
        <p>
          We haven't found any new appointments for you yet. When we do you'll find them
          here.
        </p>
      ) : (
        <>
          <h1 className="text-xl py-4">Log history</h1>
          <LogTable logs={logs} />
        </>
      )}
    </div>
  )
}

export default Dashboard
