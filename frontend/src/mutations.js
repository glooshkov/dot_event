import gql from 'graphql-tag'

export const USER_SIGNUP  = gql`
  mutation (
    $first_name: String!,
    $last_name: String!,
    $profile_region: JSONString!,
    $profile_city: JSONString!,
    $username: String!,
    $password: String!,
    $joined_date: String!,
    $percent_prepayment: String,
    $prepayment_fixed: String,
    $non_refundable_prepayment: String,
    $color_theme: Boolean!,
    $notifications_coming: Boolean!,
    $notifications_past: Boolean!,
    $cope_backup: Boolean!,
    $synchronization: Boolean!,
  ) {
    create_user(
      first_name: $first_name,
      last_name: $last_name,
      profile_region: $profile_region,
      profile_city: $profile_city,
      username: $username,
      password: $password,
      joined_date: $joined_date,
      percent_prepayment: $percent_prepayment,
      prepayment_fixed: $prepayment_fixed,
      non_refundable_prepayment: $non_refundable_prepayment,
      color_theme: $color_theme,
      notifications_coming: $notifications_coming,
      notifications_past: $notifications_past,
      cope_backup: $cope_backup,
      synchronization: $synchronization,
    ) {
      success_cruser
    }
  }
`

export const CONFIRM_USER_SIGNUP  = gql`
  mutation (
    $token: String! 
  ) {
    confirm_registration(
      token: $token, 
    ) {
      user {
        id
        first_name
        last_name
        profile_region
        profile_city
        username
        joined_date
      }
    }
  }
`

export const USER_SIGNIN = gql`
  mutation ($username: String!, $password: String!) {
    token_auth(username: $username, password: $password) {
      token
      user {
        id
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
        first_name
        last_name
        profile_region
        profile_city
        username
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
  }
`

export const CHECK_USER = gql`
  mutation ($username: String!) {
    begin_restore_password(username: $username) {
      success_check_user
    }
  }
`

export const CHECK_CODE = gql`
  mutation ($code: String!) {
    confirm_restore_password(code: $code) {
      success_check_code
    }
  }
`

export const USER_RES_PASSWORD = gql`
  mutation ($username: String!, $password: String!) {
    restore_password(username: $username, password: $password) {
      user {
        id
        event_log {
          eventid
        }
        first_name
        last_name
        profile_region
        profile_city
        username
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
  }
`

export const UPDATE_USER_PROFILE = gql`
  mutation (
    $id: ID!
    $first_name: String!
    $last_name: String!
    $profile_region: JSONString!
    $profile_city: JSONString!
    $percent_prepayment: String
    $prepayment_fixed: String
    $non_refundable_prepayment: String
  ) {
    update_user_profile(
      id: $id
      first_name: $first_name
      last_name: $last_name
      profile_region: $profile_region
      profile_city: $profile_city
      percent_prepayment: $percent_prepayment
      prepayment_fixed: $prepayment_fixed
      non_refundable_prepayment: $non_refundable_prepayment
    ) {
      user {
        id
        event_log {
          eventid
        }
        first_name
        last_name
        username
        joined_date
        profile_region
        profile_city
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
  }
`

export const UPDATE_USER_SETTINGS = gql`
  mutation (
    $id: ID!
    $color_theme: Boolean!
    $notifications_coming: Boolean!
    $notifications_past: Boolean!
    $cope_backup: Boolean!
    $synchronization: Boolean!
  ) {
    update_user_settings(
      id: $id
      color_theme: $color_theme
      notifications_coming: $notifications_coming
      notifications_past: $notifications_past
      cope_backup: $cope_backup
      synchronization: $synchronization
    ) {
      user {
        id
        event_log {
          eventid
        }
        first_name
        last_name
        username
        joined_date
        profile_region
        profile_city
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
  }
`

export const CREATE_EVENT  = gql`
  mutation (
    $id: ID!
    $short_name: String!
    $date_event: String!
    $created_at: String!
    $start_time: String!
    $end_time: String!
    $duration_time: String
    $client: String!
    $region_event: JSONString!
    $city_event: JSONString!
    $address: String
    $fio_client: String!
    $num_phone: String!
    $contact_tg: String
    $contact_vk: String
    $num_phone_add: String
    $notes: String
    $schedules: JSONString
    $payment: String
    $prepayment: String
    $at_the_event: String
    $remainder: String
    $expenses: JSONString
    $expenses_sum: String
    $source_event: JSONString
    $status_event: JSONString!
    $format_event: JSONString!
    $type_event: JSONString!
    $is_payment_checked: Boolean
    $is_prepayment_checked: Boolean
    $is_at_the_event_checked: Boolean
    $is_remainder_checked: Boolean
    $add_non_refundable_prepayment: Boolean
  ) {
    create_event(
      id: $id
      short_name: $short_name
      date_event: $date_event
      created_at: $created_at
      start_time: $start_time
      end_time: $end_time
      duration_time: $duration_time
      client: $client
      region_event: $region_event
      city_event: $city_event
      address: $address
      fio_client: $fio_client
      num_phone: $num_phone
      contact_tg: $contact_tg
      contact_vk: $contact_vk
      num_phone_add: $num_phone_add
      notes: $notes
      schedules: $schedules
      payment: $payment
      prepayment: $prepayment
      at_the_event: $at_the_event
      remainder: $remainder
      expenses: $expenses
      expenses_sum: $expenses_sum
      source_event: $source_event
      status_event: $status_event
      format_event: $format_event
      type_event: $type_event
      is_payment_checked: $is_payment_checked
      is_prepayment_checked: $is_prepayment_checked
      is_at_the_event_checked: $is_at_the_event_checked
      is_remainder_checked: $is_remainder_checked
      add_non_refundable_prepayment: $add_non_refundable_prepayment
    ) {
      eventid {
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
  }
`

export const UPDATE_EVENT = gql`
  mutation (
    $id_event: ID!
    $id: ID!
    $short_name: String!
    $date_event: String!
    $start_time: String!
    $end_time: String!
    $duration_time: String
    $client: String!
    $region_event: JSONString!
    $city_event: JSONString!
    $address: String
    $fio_client: String!
    $num_phone: String!
    $contact_tg: String
    $contact_vk: String
    $num_phone_add: String
    $notes: String
    $schedules: JSONString
    $payment: String
    $prepayment: String
    $at_the_event: String
    $remainder: String
    $expenses: JSONString
    $expenses_sum: String
    $source_event: JSONString
    $status_event: JSONString!
    $format_event: JSONString!
    $type_event: JSONString!
    $is_payment_checked: Boolean
    $is_prepayment_checked: Boolean
    $is_at_the_event_checked: Boolean
    $is_remainder_checked: Boolean
    $add_non_refundable_prepayment: Boolean
  ) {
    update_event(
      id_event: $id_event
      id: $id
      short_name: $short_name
      date_event: $date_event
      start_time: $start_time
      end_time: $end_time
      duration_time: $duration_time
      client: $client
      region_event: $region_event
      city_event: $city_event
      address: $address
      fio_client: $fio_client
      num_phone: $num_phone
      contact_tg: $contact_tg
      contact_vk: $contact_vk
      num_phone_add: $num_phone_add
      notes: $notes
      schedules: $schedules
      payment: $payment
      prepayment: $prepayment
      at_the_event: $at_the_event
      remainder: $remainder
      expenses: $expenses
      expenses_sum: $expenses_sum
      source_event: $source_event
      status_event: $status_event
      format_event: $format_event
      type_event: $type_event
      is_payment_checked: $is_payment_checked
      is_prepayment_checked: $is_prepayment_checked
      is_at_the_event_checked: $is_at_the_event_checked
      is_remainder_checked: $is_remainder_checked
      add_non_refundable_prepayment: $add_non_refundable_prepayment
    ) {
      eventid {
        id_event
        short_name
        date_event
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
  }
`
