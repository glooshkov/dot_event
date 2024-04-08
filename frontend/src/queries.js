import gql from 'graphql-tag'

export const SITE_INFO = gql`
  query {
    site {
      name
    }
  }
`

export const All_EVENTS_LOG = gql`
  query($id: ID!) {
    all_events_by_user(id: $id) {
      id_event
      short_name
      date_event
      format_event
      type_event
      status_event
    }
  }
`

export const DETAILS_BY_EVENT = gql`
  query ($id_event: ID!) {
    event_details(id_event: $id_event) {
      id_event
      short_name
      date_event
      created_at
      start_time
      end_time
      duration_time
      client
      region_event
      city_event
      address
      fio_client
      num_phone
      contact_tg
      contact_vk
      num_phone_add
      notes
      schedules
      payment
      prepayment
      at_the_event
      remainder
      expenses
      expenses_sum
      source_event
      status_event
      format_event
      type_event
      is_payment_checked
      is_prepayment_checked
      is_at_the_event_checked
      is_remainder_checked
      add_non_refundable_prepayment
    }
  }
`

export const EVENTS_BY_CALENDAR = gql`
  query($id: ID!) {
    all_user_events_calendar(id: $id) {
      event_log {
        id_event
        date_event
        start_time
        end_time
        format_event
        client
        type_event
        status_event
      }
    }
  }
`

export const CURRENT_USER = gql`
  query ($id: ID!) {
    current_user(id: $id) {
      id
      first_name
      last_name
      username
      avatar
      profile_region
      profile_city
      profile_type
      event_log {
        id_event
        short_name
        date_event
        created_at
        start_time
        end_time
        duration_time
        client
        region_event
        city_event
        address
        fio_client
        num_phone
        contact_tg
        contact_vk
        num_phone_add
        notes
        schedules
        payment
        prepayment
        at_the_event
        remainder
        expenses
        expenses_sum
        source_event
        status_event
        format_event
        type_event
        is_payment_checked
        is_prepayment_checked
        is_at_the_event_checked
        is_remainder_checked
        add_non_refundable_prepayment
      }
      joined_date
      percent_prepayment
      prepayment_fixed
      non_refundable_prepayment
      color_theme
      notifications_coming
      notifications_past
      cope_backup
      synchronization
    }
  }
`

export const EVENTS_BY_FIN_USER = gql`
  query($id: ID!) {
    all_user_events_by_financial(id: $id) {
      id_event
      date_event
      duration_time
      format_event
      payment
      expenses_sum
    }
  }
`

export const EVENTS_FOR_FIN_REGION = gql`
  query {
    all_events_by_financial_region {
      id_event
      date_event
      duration_time
      region_event
      city_event
      format_event
      payment
      source_event
      status_event
    }
  }
`
