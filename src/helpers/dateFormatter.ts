export default function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  // Format date and time
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('id-ID', {month: 'long'}).format(date); // Indonesian month names
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Combine into the desired format
  return `${day} ${month} ${year} - Pukul ${hours}.${minutes}`;
}
