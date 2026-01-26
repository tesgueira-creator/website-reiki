import { redirect } from 'next/navigation'

/**
 * Redirect /cliente to /cliente/configuracoes
 */
export default function ClientPage() {
  redirect('/cliente/configuracoes')
}
